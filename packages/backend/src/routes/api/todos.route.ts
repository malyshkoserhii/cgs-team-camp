import { Router } from 'express';

import { prismaClient } from '@/prisma/prismaClient';
import { reqBodySchema, todoSchema } from '@/schemas';
import { genericValidatorMiddleware, isExistMiddleware } from '@/middlewares';
import {
	ctrAddNewTodo,
	ctrDeleteTodoById,
	ctrGetAllTodo,
	ctrGetTodoById,
	ctrPatchTodoById,
	ctrUpdateTodoById,
} from '@/controllers';

const todosRouter: Router = Router();

todosRouter.post(
	'/create',
	genericValidatorMiddleware(reqBodySchema),
	genericValidatorMiddleware(todoSchema),
	ctrAddNewTodo,
);

todosRouter.get('/all', ctrGetAllTodo);

todosRouter.get(
	'/todo/:id',
	isExistMiddleware(prismaClient.todo),
	ctrGetTodoById,
);

todosRouter.put(
	'/todo/:id',
	isExistMiddleware(prismaClient.todo),
	genericValidatorMiddleware(reqBodySchema),
	genericValidatorMiddleware(todoSchema),
	ctrUpdateTodoById,
);

todosRouter.delete(
	'/todo/:id',
	isExistMiddleware(prismaClient.todo),
	ctrDeleteTodoById,
);

todosRouter.patch(
	'/todo/:id',
	isExistMiddleware(prismaClient.todo),
	ctrPatchTodoById,
);

export default todosRouter;
