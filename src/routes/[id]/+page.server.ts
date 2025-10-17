import db from '$lib/db';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const message = db.data.messages.find((m) => m.id == params.id);

	if (!message) {
		return error(404);
	}
	return { message };
}
