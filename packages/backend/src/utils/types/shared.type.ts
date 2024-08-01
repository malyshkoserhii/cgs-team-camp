import { NextFunction } from 'express';

export type FunctionType = (...args: unknown[]) => unknown;

export type AsyncMethodType = (
	req: unknown,
	res: unknown,
	next: NextFunction,
) => Promise<unknown>;

export type Error = {
	code: number;
	detail: string;
	message: string;
};

export type ValuesOf<T> = T[keyof T];
