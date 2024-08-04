export interface FilterKeys {
	[key: string]: string | number | (string | number)[];
}

const duplicateKeyRegex = /^(\w+)(\d+)$/;

export const decodeSearchParams = (
	searchParams: URLSearchParams,
): Partial<FilterKeys> => {
	const decodedParams: Partial<FilterKeys> = {};

	[...searchParams.entries()].forEach(([key, val]) => {
		const match = key.match(duplicateKeyRegex);
		if (match) {
			const [, baseKey, index] = match;
			if (!decodedParams[baseKey]) {
				decodedParams[baseKey] = [];
			}
			(decodedParams[baseKey] as (string | number)[])[parseInt(index)] =
				isNaN(Number(val)) ? val : Number(val);
		} else {
			decodedParams[key] = isNaN(Number(val)) ? val : Number(val);
		}
	});

	return decodedParams;
};

export const encodeSearchParams = (
	params: Record<string, string>,
): Record<string, string> => {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((param, index) => {
				searchParams.append(`${key}${index}`, param);
			});
		} else {
			searchParams.set(key, value);
		}
	});

	return searchParams as unknown as Record<string, string>;
};
