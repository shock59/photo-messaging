// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type Image = {
		src: string;
		alt: string;
	};

	type Guess = {
		text: string;
		author: string;
	};

	type Message = {
		id: string;
		text: string;
		images: Image[];
		guesses: Guess[];
	};
}

export {};
