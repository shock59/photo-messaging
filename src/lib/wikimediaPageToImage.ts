import { stripHtml } from "string-strip-html";

export function wikimediaPageToImage(page: WikimediaPage) {
	const imageInfo = page.imageinfo[0];
	const author = stripHtml(imageInfo.extmetadata.Artist?.value ?? "Wikimedia").result;

	return {
		filename: page.title,
		srcs: { small: imageInfo.thumburl, large: imageInfo.url },
		alt: stripHtml(page.entityterms?.label[0] ?? "Image").result,
		attribution: {
			text: author,
			href: imageInfo.descriptionurl,
		},
	};
}
