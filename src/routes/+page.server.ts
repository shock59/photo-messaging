import { redirect } from "@sveltejs/kit";
import db from "$lib/db";
import { getGuessedMessages } from "$lib/cookies";

function randomFromArray<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export function load({ cookies }) {
	const guessedMessages = getGuessedMessages(cookies);
	let messages = db.data.messages.filter((message) => !guessedMessages.includes(message.id));

	if (messages.length == 0) {
		redirect(302, "/new");
	}

	const messageId = randomFromArray(messages).id;
	redirect(302, `/${messageId}`);
}
