import db from "$lib/db.js";
import { wikimediaPageToImage } from "$lib/wikimediaPageToImage";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const text = data.get("text");
		if (!text || typeof text !== "string") {
			return error(400, "Bad text");
		}

		const imageTitlesString = data.get("imageTitles");
		if (!isStringifiedStringArray(imageTitlesString)) {
			return error(400, "Bad images");
		}
		const imageTitles = JSON.parse(imageTitlesString) as string[];

		let author = data.get("author") ?? "Anonymous";
		if (typeof author !== "string") {
			return error(400, "Bad author");
		}
		if (author == "") {
			author = "Anonymous";
		}

		let images: Image[] = [];

		for (const title of imageTitles) {
			const res = await fetch(
				`https://commons.wikimedia.org/w/api.php?action=query&format=json&uselang=en&titles=${encodeURIComponent(title)}&prop=info%7Cimageinfo%7Centityterms&inprop=url&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlheight=220&wbetterms=label`,
			);
			const wikimediaJson = (await res.json()) as WikimediaResponse;

			const pages = Object.values(wikimediaJson.query.pages);
			if (pages.length == 0) {
				return error(400, `Invalid image: ${title}`);
			}
			const page = pages[0];
			images.push(wikimediaPageToImage(page));
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

	for (let maybeString of parsed) {
		if (typeof maybeString !== "string") {
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
