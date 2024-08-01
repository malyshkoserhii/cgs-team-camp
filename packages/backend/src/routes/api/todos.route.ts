import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

import todoController from '../../controllers/todo.controller';
import validate from '@/middlewares/validate';
import {
	createTodoSchema,
	updateTodoSchema,
} from '@/validation/todo.validation';
import tryCatch from '@/middlewares/tryCatch';
import { isExist } from '@/validation/isExist';

const todosRouter: Router = Router();

todosRouter.post(
	'/',
	validate(createTodoSchema),
	tryCatch(todoController.createTodo.bind(todoController)),
);
todosRouter.get('/', tryCatch(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
	'/:id',
	isExist(Prisma.ModelName.Todo as keyof PrismaClient),
	tryCatch(todoController.getTodoById.bind(todoController)),
);
todosRouter.put(
	'/:id',
	isExist(Prisma.ModelName.Todo as keyof PrismaClient),
	validate(updateTodoSchema),
	tryCatch(todoController.updateTodo.bind(todoController)),
);

todosRouter.delete(
	'/:id',
	isExist(Prisma.ModelName.Todo as keyof PrismaClient),
	tryCatch(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
