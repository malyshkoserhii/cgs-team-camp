import { ActionType, HandlerType } from '@/types/http-errors.type';
import { NextFunction, Request, Response } from 'express';

export const ctrlWrapper = (ctrl: ActionType): HandlerType => {
	const func = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await ctrl(req, res);
		} catch (error) {
			next(error);
		}
	};

	return func;
};
