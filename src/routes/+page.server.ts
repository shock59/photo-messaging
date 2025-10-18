import { redirect } from "@sveltejs/kit";
import db from "$lib/db";

function randomFromArray<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

if (db.data.messages.length == 0) {
	redirect(302, "/new");
}

const messageId = randomFromArray(db.data.messages).id;
redirect(302, `/${messageId}`);
