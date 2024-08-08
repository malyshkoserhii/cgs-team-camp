import { Request, Response, NextFunction, RequestHandler } from 'express';

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
	req: Request,
	res: Response,
	next: NextFunction,
) => void = (
	err: { status: number; message: string },
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err);
	res.status(err.status).send({ error: err.message }).end();
	next();
};
