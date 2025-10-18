export default async function asyncFilter<T>(array: T[], check: (item: T) => Promise<boolean>) {
	const results = await Promise.all(array.map(check));
	return array.filter((_, index) => results[index]);
}
