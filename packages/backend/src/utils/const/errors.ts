export const ErrorMessages = {
	INVALID_CREDENTIALS: 'Invalid credentials.',
	ALREADY_EXISTS: (label: string): string =>
		label ? `${label} already exists.` : 'Already exists.',
	invalidId: (id: string): string => `Invalid id in request params: ${id}`,
	notFound: (label?: string): string =>
		label ? `${label} not found` : 'Not found',
	minLength: (length: number): string =>
		`Minimum length should be ${length} characters`,
	isRequired: (label: string): string => `${label} is required`,
	badRequest: 'Bad Request',
	unauthorized: 'Unauthorized',
	forbidden: 'You do not have permission for this action.',
	conflict: 'Conflict',
	internalServerError: 'Internal Server Error',
};
