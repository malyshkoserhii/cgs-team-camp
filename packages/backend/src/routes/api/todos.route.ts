import { Router } from 'express';

import { prismaClient } from '@/prisma/prismaClient';
import { reqBodySchema, todoSchema } from '@/schema';
import { genericValidator, isExistMiddleware } from '@/middlewares';
import {
	ctrAddNewTodo,
	ctrDeleteTodoById,
	ctrGetAllTodo,
	ctrGetTodoById,
	ctrUpdateTodoById,
} from '@/controllers';

const todosRouter: Router = Router();

todosRouter.post(
	'/create',
	genericValidator(reqBodySchema),
	genericValidator(todoSchema),
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
	genericValidator(reqBodySchema),
	genericValidator(todoSchema),
	ctrUpdateTodoById,
);

todosRouter.delete(
	'/todo/:id',
	isExistMiddleware(prismaClient.todo),
	ctrDeleteTodoById,
);

export default todosRouter;
