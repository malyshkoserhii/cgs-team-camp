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

export const ErrorCodes = {
	ok: 200,
	created: 201,
	accepted: 202,
	noContent: 204,

	badRequest: 400,
	unauthorized: 401,
	forbidden: 403,
	notFound: 404,
	methodNotAllowed: 405,
	duplicateEntry: 409,

	internalServerError: 500,
	notImplemented: 501,
	badGateway: 502,
	serviceUnavailable: 503,
	gatewayTimeout: 504,
};
