import { NextFunction, Request, Response } from 'express';
import { AsyncMethodType, FunctionType } from '@/utils/types/shared.type';
import { ApiError } from '../helpers/ApiError.helper';

function isAsyncFunction(target: FunctionType): boolean {
	return target.constructor.name === 'AsyncFunction';
}

function TryCatchClass<T extends { new (...args: unknown[]): object }>(
	target: T,
): T {
	const methodNames = Object.getOwnPropertyNames(target.prototype);
	methodNames.forEach((methodName) => {
		const originalMethod = target.prototype[methodName];
		if (typeof originalMethod !== 'function') return;

		if (isAsyncFunction(originalMethod)) {
			target.prototype[methodName] = async function (
				req: Request,
				res: Response,
				next: NextFunction,
			): Promise<Response<unknown, Record<string, unknown>> | undefined> {
				try {
					const responseBody = await originalMethod.call(
						this,
						req,
						res,
						next,
					);
					if (responseBody) res.send(responseBody);
				} catch (error) {
					console.error(`Error in method ${methodName}:`, error);
					if (error instanceof ApiError) {
						return res.status(error.status).json({
							error: error.message,
							status: error.status,
						});
					}
				}
			};
		}
	});

	return target;
}

export function TryCatchFunction<T extends FunctionType>(target: T): T {
	if (!isAsyncFunction(target)) return target;

	const originalTarget = target as AsyncMethodType;

	return async function (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const responseBody = await originalTarget(req, res, next);
			if (responseBody) res.send(responseBody);
		} catch (error) {
			console.error(`Error in function ${originalTarget.name}:`, error);
			next(error);
		}
	} as T;
}

export default function TryCatch<T>(target: T): T {
	if (typeof target === 'function' && target.prototype) {
		return TryCatchClass(target as new (...args: unknown[]) => object) as T;
	} else if (typeof target === 'function') {
		return TryCatchFunction(target as (...args: unknown[]) => unknown) as T;
	}

	return target;
}
