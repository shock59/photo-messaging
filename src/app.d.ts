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
		filename: string;
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
		author: string;
		text: string;
		images: Image[];
		guesses: Guess[];
	};

	type WikimediaPage = {
		title: string;
		index: number;
		imageinfo: {
			thumburl: string;
			url: string;
			descriptionurl: string;
			extmetadata: {
				Artist?: {
					value: string;
				};
			};
		}[];
		entityterms?: {
			label: string[];
		};
	};

	type WikimediaResponse = {
		query: {
			pages: Record<string, WikimediaPage>;
		};
	};
}

export {};
