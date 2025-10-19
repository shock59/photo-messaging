import { JSONFilePreset } from "lowdb/node";
const db = await JSONFilePreset<{
	messages: Message[];
	unsafeImages: Record<string, boolean>;
	bannedWords: string[];
}>("db.json", { messages: [], unsafeImages: {}, bannedWords: [] });
export default db;
