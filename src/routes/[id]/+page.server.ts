import db from '$lib/db';
import { error, redirect } from '@sveltejs/kit';

function getMessage(id: string) {
	return db.data.messages.find((m) => m.id == id);
}

export function load({ params, cookies }) {
	const message = getMessage(params.id);
	if (!message) {
		return error(404);
	}

	const guessed = cookies.get('guessed') == 'true';

	return { message, guessed };
}

export const actions = {
	guess: async ({ request, params, cookies, url }) => {
		const message = getMessage(params.id);
		if (!message) {
			return error(404);
		}

		const data = await request.formData();
		const text = data.get('text');
		if (!text || typeof text !== 'string') {
			return error(400, 'Bad text');
		}
		let author = data.get('author') ?? 'Anonymous';
		if (typeof author !== 'string') {
			return error(400, 'Bad author');
		}
		if (author == '') {
			author = 'Anonymous';
		}

		const guess: Guess = { text, author };
		message.guesses.unshift(guess);
		db.write();
		cookies.set('guessed', 'true', { path: url.pathname });
		return redirect(302, '../');
	}
};
