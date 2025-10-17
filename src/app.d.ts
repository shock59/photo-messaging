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

	type Message = {
		id: string;
		images: Image[];
	};
}

export {};
