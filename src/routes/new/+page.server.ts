import { addGuessedCookie } from "$lib/cookies.js";
import db from "$lib/db.js";
import isPexelsError from "$lib/isPexelsError";
import pexelsClient from "$lib/pexelsClient.js";
import unsafeImage from "$lib/unsafeImage.js";
import { wikimediaPageToImage } from "$lib/wikimediaPageToImage";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const text = data.get("text");
		if (!text || typeof text !== "string") {
			return error(400, "Bad text");
		}

		const imagesString = data.get("images");
		if (!isStringifiedStringArray(imagesString)) {
			return error(400, "Bad images");
		}
		const selectedImages = JSON.parse(imagesString) as (["commons", string] | ["pexels", number])[];

		let author = data.get("author") ?? "Anonymous";
		if (typeof author !== "string") {
			return error(400, "Bad author");
		}
		if (author == "") {
			author = "Anonymous";
		}

		let images: ServiceImage[] = [];

		for (const selectedImage of selectedImages) {
			if (selectedImage[0] == "commons") {
				const res = await fetch(
					`https://commons.wikimedia.org/w/api.php?action=query&format=json&uselang=en&titles=${encodeURIComponent(selectedImage[1])}&prop=info%7Cimageinfo%7Centityterms&inprop=url&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlheight=220&wbetterms=label`,
				);
				const wikimediaJson = (await res.json()) as WikimediaResponse;

				const pages = Object.values(wikimediaJson.query.pages);
				if (pages.length == 0) {
					return error(400, `Invalid image: ${selectedImage}`);
				}
				const page = pages[0];

				if (await unsafeImage(page.imageinfo[0].url)) {
					return error(400, `Image was flagged by moderation: ${selectedImage}`);
				}

				images.push(wikimediaPageToImage(page));
			} else {
				const photo = await pexelsClient.photos.show({ id: selectedImage[1] });
				if (isPexelsError(photo)) {
					return error(400, `Invalid image: ${selectedImage}`);
				}

				images.push({
					type: "pexels",
					id: photo.id,
					srcs: {
						small: photo.src.medium,
						large: photo.src.original,
					},
					alt: photo.alt ?? "Image",
					attribution: {
						text: `${photo.photographer} on Pexels`,
						href: photo.url,
					},
				});
			}
		}

		const message: Message = {
			id: generateId(),
			author,
			text,
			images,
			guesses: [],
		};
		db.data.messages.push(message);
		db.write();

		addGuessedCookie(cookies, message.id);
		return redirect(302, `/${message.id}`);
	},
};

function isStringifiedStringArray(thing: any): thing is string {
	if (!thing || typeof thing !== "string") {
		return false;
	}

	const parsed = JSON.parse(thing);
	if (!Array.isArray(parsed)) {
		return false;
	}

	for (let maybeCorrect of parsed) {
		if (!Array.isArray(maybeCorrect) || maybeCorrect.length != 2) {
			return false;
		}
		if (
			!(
				(maybeCorrect[0] === "commons" && typeof maybeCorrect[1] === "string") ||
				(maybeCorrect[0] === "pexels" && typeof maybeCorrect[1] === "number")
			)
		) {
			return false;
		}
	}
	return true;
}

function generateId() {
	const id = `${Math.floor(Math.random() * 10 ** 16)}`;
	if (id.length != 16 || db.data.messages.find((message) => message.id == id)) return generateId();
	return id;
}
