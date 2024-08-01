export class ApiErrors extends Error {
	public status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}

	static BadRequest(message: string = 'Bad request'): ApiErrors {
		return new ApiErrors(400, message);
	}

	static Unauthorized(message: string = 'Unauthorized'): ApiErrors {
		return new ApiErrors(401, message);
	}

	static Forbidden(message: string = 'Forbidden'): ApiErrors {
		return new ApiErrors(403, message);
	}

	static NotFound(message: string = 'Not found'): ApiErrors {
		return new ApiErrors(404, message);
	}

	static Conflict(message: string = 'Conflict'): ApiErrors {
		return new ApiErrors(409, message);
	}

	static UnprocessableEntity(message = 'Unprocessable Entity'): ApiErrors {
		return new ApiErrors(422, message);
	}

	static InternalServerError(message = 'Internal Server Error'): ApiErrors {
		return new ApiErrors(500, message);
	}
}
