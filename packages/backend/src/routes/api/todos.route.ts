import { Router } from 'express';
import todoController from '@/controllers/todo.controller';
import { checkExistence } from '@/middlewares/existenceCheck.middleware';
import { validate } from '@/middlewares/validation.middleware';
import { tryCatch } from '@/middlewares/errorHandling.middleware';
import {
	todoItemCreateSchema,
	todoItemUpdateSchema,
} from '@/middlewares/schemas/todoItem.schema';

const todoRouter = Router();

todoRouter.use(
	'update/:id',
	checkExistence({ model: 'todoItem', idParam: 'id' }),
);
todoRouter.use(
	'delete/:id',
	checkExistence({ model: 'todoItem', idParam: 'id' }),
);

todoRouter.get('/', tryCatch(todoController.getTodoItem.bind(todoController)));
todoRouter.post(
	'/create',
	validate(todoItemCreateSchema),
	tryCatch(todoController.createTodoItem.bind(todoController)),
);
todoRouter.put(
	'/update/:id',
	validate(todoItemUpdateSchema),
	tryCatch(todoController.updateTodoItem.bind(todoController)),
);
todoRouter.delete(
	'/delete/:id',
	tryCatch(todoController.deleteTodoItem.bind(todoController)),
);

export default todoRouter;
