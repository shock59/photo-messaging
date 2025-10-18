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
		widthHeightRatio: number;
		alt: string;
		attribution: {
			text: string;
			href: string;
		};
	};

	type CommonsImage = Image & {
		type: "commons";
		filename: string;
	};

	type PexelsImage = Image & {
		type: "pexels";
		id: number;
	};

	type ServiceImage = CommonsImage | PexelsImage;

	type Guess = {
		text: string;
		author: string;
	};

	type Message = {
		id: string;
		author: string;
		text: string;
		images: ServiceImage[];
		guesses: Guess[];
	};

	type WikimediaPage = {
		title: string;
		index: number;
		imageinfo: {
			width: number;
			height: number;
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
