import { JSONFilePreset } from "lowdb/node";
const db = await JSONFilePreset<{ messages: Message[]; unsafeImages: Record<string, boolean> }>(
	"db.json",
	{ messages: [], unsafeImages: {} },
);
export default db;
