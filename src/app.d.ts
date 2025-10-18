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
		srcs: {
			small: string;
			large: string;
		};
		alt: string;
		attribution: {
			text: string;
			href: string;
		};
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
