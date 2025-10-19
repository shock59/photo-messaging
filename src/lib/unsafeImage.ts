import { OPENAI_KEY } from "$env/static/private";
import OpenAI from "openai";
import db from "./db";
const openai = new OpenAI({ apiKey: OPENAI_KEY });

export default async function unsafeImage(url: string) {
	if (db.data.unsafeImages[url] !== undefined) {
		return db.data.unsafeImages[url];
	}

	try {
		const moderation = await openai.moderations.create({
			model: "omni-moderation-latest",
			input: [
				{
					type: "image_url",
					image_url: { url },
				},
			],
		});

		const unsafe = !!Object.values(moderation.results[0].category_scores).filter(
			(score) => score > 0.1,
		).length;
		db.data.unsafeImages[url] = unsafe;
		db.write();
		return unsafe;
	} catch {
		return true;
	}
}
