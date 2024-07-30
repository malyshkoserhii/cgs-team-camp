import { Response, Request, NextFunction, RequestHandler } from 'express';

export class Middlewares {
	constructor() {}

	tryCatch(action: RequestHandler): RequestHandler {
		return async function (
			req: Request,
			res: Response,
			next: NextFunction,
		) {
			try {
				await action(req, res, next);
			} catch (e) {
				next(e);
			}
		};
	}
}

const middlewares = new Middlewares();
export default middlewares;
