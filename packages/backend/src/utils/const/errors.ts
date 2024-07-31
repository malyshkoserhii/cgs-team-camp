export const ErrorMessages = {
	invalidId: (id: string): string => `Invalid id in request params: ${id}`,
	notFound: (label?: string): string =>
		label ? `${label} not found` : 'Not found',
	minLength: (length: number): string =>
		`Minimum length should be ${length} characters`,
	isRequired: (label: string): string => `${label} is required`,
	badRequest: 'Bad Request',
	unauthorized: 'Unauthorized',
	forbidden: 'Forbidden',
	conflict: 'Conflict',
	internalServerError: 'Internal Server Error',
};
