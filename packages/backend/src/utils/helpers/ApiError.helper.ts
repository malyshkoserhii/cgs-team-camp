import { ErrorMessages } from '../const/errors';
import { StatusCodes } from '../const/statusCodes';

export class ApiError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		Error.captureStackTrace(this, this.constructor);
	}

	static AuthorizationError(message?: string): ApiError {
		return new ApiError(
			StatusCodes.unauthorized,
			message ?? ErrorMessages.unauthorized,
		);
	}

	static BadRequestError(message?: string): ApiError {
		return new ApiError(
			StatusCodes.badRequest,
			message ?? ErrorMessages.badRequest,
		);
	}

	static ConflictError(message?: string): ApiError {
		return new ApiError(
			StatusCodes.duplicateEntry,
			message ?? ErrorMessages.conflict,
		);
	}

	static NotFoundError(message?: string): ApiError {
		return new ApiError(
			StatusCodes.notFound,
			message ?? ErrorMessages.notFound(),
		);
	}

	static AuthenticationError(message?: string): ApiError {
		return new ApiError(
			StatusCodes.forbidden,
			message ?? ErrorMessages.forbidden,
		);
	}

	static InternalServerError(message?: string): ApiError {
		return new ApiError(
			StatusCodes.internalServerError,
			message ?? ErrorMessages.internalServerError,
		);
	}
}
