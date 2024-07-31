import { Request, Response } from 'express';

export const routesErrorHandlerMiddleware = (
	req: Request,
	res: Response,
): void => {
	res.status(404).send({ message: 'Route not Found' });
};
