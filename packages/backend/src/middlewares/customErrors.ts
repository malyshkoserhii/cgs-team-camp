class AppError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.name = 'AppError';
	}
}

class NotFoundError extends AppError {
	constructor(message: string) {
		super(message, 404);
		this.name = 'NotFoundError';
	}
}

class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400);
		this.name = 'ValidationError';
	}
}

class UnauthorizedError extends AppError {
	constructor(message: string) {
		super(message, 401);
		this.name = 'UnauthorizedError';
	}
}

export { AppError, NotFoundError, ValidationError, UnauthorizedError };
