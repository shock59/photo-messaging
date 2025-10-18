import isPexelsError from "$lib/isPexelsError";
import pexelsClient from "$lib/pexelsClient.js";
import { error, json } from "@sveltejs/kit";

export async function GET({ params }) {
	const results = await pexelsClient.photos.search({ query: params.query, per_page: 10 });
	if (isPexelsError(results)) {
		return error(500, "Pexels error");
	}

	return json(
		results.photos.map((photo) => ({
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
		})),
	);
}
