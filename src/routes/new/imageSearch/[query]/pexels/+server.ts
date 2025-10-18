import isPexelsError from "$lib/isPexelsError";
import pexelsClient from "$lib/pexelsClient.js";
import pexelsPhotoToImage from "$lib/pexelsPhotoToImage";
import { error, json } from "@sveltejs/kit";

export async function GET({ params }) {
	const results = await pexelsClient.photos.search({ query: params.query, per_page: 10 });
	if (isPexelsError(results)) {
		return error(500, "Pexels error");
	}

	return json(results.photos.map(pexelsPhotoToImage));
}
