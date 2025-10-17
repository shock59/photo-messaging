import { json } from '@sveltejs/kit';

type WikimediaResponse = {
	query: {
		pages: Record<
			string,
			{
				index: number;
				imageinfo: {
					thumburl: string;
					url: string;
					descriptionurl: string;
				}[];
				entityterms?: {
					label: string[];
				};
			}
		>;
	};
};

export async function GET({ params }) {
	const res = await fetch(
		`https://commons.wikimedia.org/w/api.php?action=query&format=json&uselang=en&generator=search&gsrsearch=filetype%3Abitmap%7Cdrawing%20-fileres%3A0%20${encodeURIComponent(params.query)}&gsrlimit=10&gsroffset=0&gsrinfo=totalhits%7Csuggestion&gsrprop=size%7Cwordcount%7Ctimestamp%7Csnippet&prop=info%7Cimageinfo%7Centityterms&inprop=url&gsrnamespace=6&iiprop=url%7Csize%7Cmime&iiurlheight=220&wbetterms=label`
	);
	const wikimediaJson = (await res.json()) as WikimediaResponse;

	const images = Object.values(wikimediaJson.query.pages)
		.toSorted((a, b) => a.index - b.index)
		.map((page) => {
			return {
				src: page.imageinfo[0].thumburl,
				alt: page.entityterms?.label[0] ?? 'Image',
				attribution: {
					text: 'Wikimedia',
					href: page.imageinfo[0].descriptionurl
				}
			};
		});

	return json(images);
}
