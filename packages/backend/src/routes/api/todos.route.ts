import { Router } from 'express';

import { ctrlWrapper } from '@/helpers/ctrlWrapper';
import { isExist } from '@/middlewars/isExist';
import { validateBody } from '@/middlewars/validateBody';
import { createTodoSchema, UpdateTodoSchema } from '@/schemas/todo.schema';
import { prisma } from '@/services/prisma/prisma.service';
import { TodoType } from '@/types/todos.type';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	ctrlWrapper(todoController.getAllTodo.bind(todoController)),
);
todosRouter.get(
	'/:id',

	isExist<TodoType>(prisma.todoItem),
	ctrlWrapper(todoController.getTodoById.bind(todoController)),
);
todosRouter.post(
	'/add',

	validateBody(createTodoSchema),
	ctrlWrapper(todoController.create.bind(todoController)),
);
todosRouter.delete(
	'/:id',

	isExist<TodoType>(prisma.todoItem),
	ctrlWrapper(todoController.delete.bind(todoController)),
);

todosRouter.put(
	'/:id',

	isExist<TodoType>(prisma.todoItem),
	validateBody(UpdateTodoSchema),
	ctrlWrapper(todoController.update.bind(todoController)),
);

export default todosRouter;
