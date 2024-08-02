import { HttpError } from '@/error/error';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';
import { PrismaClient } from '@prisma/client';
import { EntityWithId } from '@/types/unique.types';

const prisma = new PrismaClient();

export const validateBody = <T>(schema: ObjectSchema<T>) => {
	return (req: Request, _: Response, next: NextFunction) => {
		try {
			const { body } = req;
			const { error }: ValidationResult<T> = schema.validate(body);
			const filledBody = Object.keys(body).length;
			if (filledBody === 0) {
				next(HttpError(400, 'missing fields'));
			}

			if (error) {
				next(
					HttpError(
						400,
						`missing required ${error.message.slice(1, error.message.lastIndexOf('"'))} field`,
					),
				);
			} else {
				next();
			}
		} catch (errorW) {
      next(HttpError(500,"server validation error"))
    }
	};
};

export const isExistObject = <T>(entity:EntityWithId<T>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = parseInt(req.params.id, 10);
			if (isNaN(id)) {
				return next(HttpError(404,"check datatypes on request id"));
			}

			const potentialEntity = await entity.findUnique({where:{id}})
			if (potentialEntity) {
				return next();
			}

			return next(HttpError(404,"No such record in database"));
		} catch (error) {
			return next(HttpError(500,"Server validation error"));
		}
	};
};
