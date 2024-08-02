import e, { Request, Response, NextFunction, RequestHandler } from 'express';

// Generic error-handling middleware
export const tryCatch = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

// Error handling middleware to format errors
export const errorHandler: (
	err: {
		status: number;
		message: string;
	},
	req: e.Request,
	res: e.Response,
	next: e.NextFunction,
) => void = (
	err: { status: number; message: string },
	req: Request,
	res: Response,
) => {
	console.error(err);
	res.status(err.status || 500).json({
		message: err.message || 'Internal Server Error',
	});
};
