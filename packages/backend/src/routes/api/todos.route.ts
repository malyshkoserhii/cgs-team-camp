import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import validate from '../../middlewares/validate';
import isExist from '../../middlewares/isExist';
import tryCatch from '../../middlewares/tryCatch';
import { todoSchema } from '../../validators/todoValidator';
import { Prisma, PrismaClient } from '@prisma/client';

const todosRouter: Router = Router();

todosRouter.get('/', tryCatch(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
	'/:id',
	isExist(Prisma.ModelName.Todo as keyof PrismaClient),
	tryCatch(todoController.getTodoById.bind(todoController)),
);
todosRouter.post(
	'/',
	validate(todoSchema),
	tryCatch(todoController.createTodo.bind(todoController)),
);
todosRouter.put(
	'/:id',
	isExist(Prisma.ModelName.Todo as keyof PrismaClient),
	validate(todoSchema),
	tryCatch(todoController.updateTodo.bind(todoController)),
);
todosRouter.delete(
	'/:id',
	isExist(Prisma.ModelName.Todo as keyof PrismaClient),
	tryCatch(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
