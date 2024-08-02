import { HttpError } from '@/error/error';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const modelMapping = {
	post: prisma.todo,
};

export const validateBody = <T>(schema: ObjectSchema<T>):Function => {
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

export const isExistObject = (entityName: keyof typeof modelMapping) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = parseInt(req.params.id, 10);
			if (isNaN(id)) {
				return res.status(400).json({ error: 'Invalid ID format' });
			}

			const entity = await modelMapping[entityName].findUnique({
				where: { id },
			});

			if (entity) {
				return next();
			}

			return res.status(404).json({ error: `${entityName} not found` });
		} catch (error) {
			return next(error);
		}
	};
};
