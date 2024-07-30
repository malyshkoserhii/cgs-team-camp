import { ErrorMessages, ErrorCodes } from '../const/errors';

export class ApiError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		Error.captureStackTrace(this, this.constructor);
	}

	static AuthorizationError(message?: string): ApiError {
		return new ApiError(
			ErrorCodes.unauthorized,
			message ?? ErrorMessages.unauthorized,
		);
	}

	static BadRequestError(message?: string): ApiError {
		return new ApiError(
			ErrorCodes.badRequest,
			message ?? ErrorMessages.badRequest,
		);
	}

	static ConflictError(message?: string): ApiError {
		return new ApiError(
			ErrorCodes.duplicateEntry,
			message ?? ErrorMessages.conflict,
		);
	}

	static NotFoundError(message?: string): ApiError {
		return new ApiError(
			ErrorCodes.notFound,
			message ?? ErrorMessages.notFound(),
		);
	}

	static AuthenticationError(message?: string): ApiError {
		return new ApiError(
			ErrorCodes.forbidden,
			message ?? ErrorMessages.forbidden,
		);
	}

	static InternalServerError(message?: string): ApiError {
		return new ApiError(
			ErrorCodes.internalServerError,
			message ?? ErrorMessages.internalServerError,
		);
	}
}
