import { JSONFilePreset } from 'lowdb/node';
const db = await JSONFilePreset<{ messages: Message[] }>('db.json', { messages: [] });
export default db;
