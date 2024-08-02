import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import {
	isExistObject,
	validateBody,
} from '@/middlewares/validator.middleware';
import { todoValidationSchema } from '@/validations/todo.validations';
import { ITodo } from '@/types/todos.type';
import { PrismaClient } from '@prisma/client';
const prisma  = new PrismaClient();

const todosRouter: Router = Router();

todosRouter.get('', todoController.GetAll.bind(todoController));
todosRouter.get(
	'/one/:id',
	isExistObject<ITodo>(prisma.todo),
	todoController.GetOne.bind(todoController),
);
todosRouter.post(
	'',
	validateBody(todoValidationSchema),
	todoController.Create.bind(todoController),
);

todosRouter.put(
	'/:id',
	isExistObject<ITodo>(prisma.todo),
	validateBody(todoValidationSchema),
	todoController.Update.bind(todoController),
);

todosRouter.delete(
	'/:id',
	isExistObject<ITodo>(prisma.todo),
	todoController.Delete.bind(todoController),
);
export default todosRouter;
