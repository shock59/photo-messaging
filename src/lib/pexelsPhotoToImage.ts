import type { Photo } from "pexels";

export default function pexelsPhotoToImage(photo: Photo): PexelsImage {
	return {
		type: "pexels",
		id: photo.id,
		srcs: {
			small: photo.src.medium,
			large: photo.src.original,
		},
		widthHeightRatio: photo.width / photo.height,
		alt: photo.alt ?? "Image",
		attribution: {
			text: `${photo.photographer} on Pexels`,
			href: photo.url,
		},
	};
}
