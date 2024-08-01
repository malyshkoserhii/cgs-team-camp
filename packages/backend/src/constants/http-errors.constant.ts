export enum HttpStatus {
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500,
	Conflict = 409,
}

export const errorMessageList: { [key in HttpStatus]: string } = {
	[HttpStatus.BadRequest]: 'Bad Request',
	[HttpStatus.Unauthorized]: 'Unauthorized',
	[HttpStatus.Forbidden]: 'Forbidden',
	[HttpStatus.NotFound]: 'Not Found',
	[HttpStatus.InternalServerError]: 'Internal Server Error',
	[HttpStatus.Conflict]: 'Internal Server Error',
};
