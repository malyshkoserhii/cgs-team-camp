// import { NextFunction, Request, Response } from 'express';
// import TryCatch from '../utils/try-catch.decorator';
// import Joi from 'joi';
// import validationSchemas from './validation.schemas';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// @TryCatch
// export class GenericValidator {
// 	constructor() {}

// 	isBodyValid(entity: any) {
// 		let joiSchema: Joi.ObjectSchema | undefined;
// 		if (entity && validationSchemas.hasOwnProperty(entity)) {
// 			const entityProp = entity as keyof typeof validationSchemas;
// 			joiSchema = validationSchemas[entityProp];
// 		}

// 		return TryCatch(async function (
// 			req: Request,
// 			res: Response,
// 			next: NextFunction,
// 		) {
// 			if (joiSchema) {
// 				await joiSchema.validateAsync(req.body);
// 			}
// 			next();
// 		});
// 	}

// 	isExists(entityName: string, idParam: string) {
// 		return TryCatch(async function (
// 			req: Request,
// 			res: Response,
// 			next: NextFunction,
// 		) {
// 			const id = parseInt(req.params[idParam], 10);
// 			if (isNaN(id)) {
// 				return res.status(400).json({ error: 'Invalid ID format' });
// 			}

// 			const entity = await prisma[entityName].findUnique({
// 				where: { id },
// 			});
// 			if (entity) {
// 				return next();
// 			}
// 			res.status(404).json({ error: `${entityName} not found` });
// 		});
// 	}
// }

// const validator = new GenericValidator();
// export default validator;
