export const parseBoolean = (value: string | undefined): boolean | undefined =>
	!value ? undefined : value.toLowerCase() === 'true';
