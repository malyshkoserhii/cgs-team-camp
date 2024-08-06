import { StatusCodes } from '@/utils/const/statusCode';

export interface IHttpError extends Error {
	status: StatusCodes;
}

export class HttpError extends Error implements IHttpError {
	public status: StatusCodes;
	constructor(
		message?: string,
		status: StatusCodes = StatusCodes.InternalServerError,
	) {
		super(message);
		this.status = status;
	}
}
