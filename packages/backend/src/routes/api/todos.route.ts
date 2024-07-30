import { Router } from 'express';

import { prismaClient } from '@/prisma/prismaClient';
import { isExistMiddleware, validateTodoReqBody } from '@/middlewares';
import {
	ctrAddNewTodo,
	ctrDeleteTodoById,
	ctrGetAllTodo,
	ctrGetTodoById,
	ctrUpdateTodoById,
} from '@/controllers';

const todosRouter: Router = Router();

todosRouter.post('/create', validateTodoReqBody, ctrAddNewTodo);
todosRouter.get('/all', ctrGetAllTodo);
todosRouter.get(
	'/todo/:id',
	isExistMiddleware(prismaClient.todo),
	ctrGetTodoById,
);
todosRouter.put(
	'/todo/:id',
	validateTodoReqBody,
	isExistMiddleware(prismaClient.todo),
	ctrUpdateTodoById,
);
todosRouter.delete(
	'/todo/:id',
	isExistMiddleware(prismaClient.todo),
	ctrDeleteTodoById,
);

export default todosRouter;
