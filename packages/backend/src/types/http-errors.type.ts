import { HttpStatus } from '@/constants/http-errors.constant';
import { NextFunction, Request, Response } from 'express';

export type HttpErrorType = {
	status: HttpStatus;
	message: string;
};
export type ActionType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export type HandlerType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export interface ResponseError extends Error {
	status?: number;
}
