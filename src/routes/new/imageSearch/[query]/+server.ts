import { json } from "@sveltejs/kit";
import { stripHtml } from "string-strip-html";

type WikimediaResponse = {
	query: {
		pages: Record<
			string,
			{
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
			}
		>;
	};
};

export async function GET({ params }) {
	const res = await fetch(
		`https://commons.wikimedia.org/w/api.php?action=query&format=json&uselang=en&generator=search&gsrsearch=filetype%3Abitmap%7Cdrawing%20-fileres%3A0%20${encodeURIComponent(params.query)}&gsrlimit=10&gsroffset=0&gsrinfo=totalhits%7Csuggestion&gsrprop=size%7Cwordcount%7Ctimestamp%7Csnippet&prop=info%7Cimageinfo%7Centityterms&inprop=url&gsrnamespace=6&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlheight=220&wbetterms=label`,
	);
	const wikimediaJson = (await res.json()) as WikimediaResponse;

	const images: Image[] = await Promise.all(
		Object.values(wikimediaJson.query.pages)
			.toSorted((a, b) => a.index - b.index)
			.map(async (page) => {
				const imageInfo = page.imageinfo[0];
				const author = stripHtml(imageInfo.extmetadata.Artist?.value ?? "Wikimedia").result;

				return {
					srcs: { small: imageInfo.thumburl, large: imageInfo.url },
					alt: stripHtml(page.entityterms?.label[0] ?? "Image").result,
					attribution: {
						text: author,
						href: imageInfo.descriptionurl,
					},
				};
			}),
	);

	return json(images);
}
