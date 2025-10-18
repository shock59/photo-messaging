import type { ErrorResponse } from "pexels";

export default function isPexelsError(thing: any): thing is ErrorResponse {
	return !!(thing as ErrorResponse).error;
}
