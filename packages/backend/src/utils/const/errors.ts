export const ErrorMessages = {
	invalidObjectId: (ids: string): string =>
		`Invalid ObjectId(s) in request params: ${ids}`,
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
