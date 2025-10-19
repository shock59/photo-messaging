import db from "./db";

export default function unsafeText(text: string) {
	const lowercaseText = text.toLowerCase();
	for (const word of db.data.bannedWords) {
		if (lowercaseText.includes(word)) return true;
	}
	return false;
}
