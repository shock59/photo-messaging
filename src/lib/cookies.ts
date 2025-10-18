import type { Cookies } from "@sveltejs/kit";

export function getGuessedMessages(cookies: Cookies) {
	const cookie = cookies.get("visited") ?? "[]";
	return JSON.parse(cookie) as string[];
}

export function guessed(cookies: Cookies, id: string) {
	return getGuessedMessages(cookies).includes(id);
}

export function addGuessedCookie(cookies: Cookies, id: string) {
	const guessed = getGuessedMessages(cookies);
	guessed.push(id);
	cookies.set("visited", JSON.stringify(guessed), {
		path: "/",
		expires: new Date("2050-01-01T00:00:00"),
	});
}
