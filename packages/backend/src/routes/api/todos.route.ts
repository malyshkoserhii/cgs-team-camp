import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { validateBody } from '@/middleware/validation.middleware';
import { todoSchema } from '@/utils/validationSchemas/todo.schema';
import { tryCatchWrapper } from '@/middleware/tryCatch.middleware';
import { isExist } from '@/middleware/isExist.middleware';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	tryCatchWrapper(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
	'/:id',
	isExist('todo'),
	tryCatchWrapper(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/',
	validateBody(todoSchema),
	tryCatchWrapper(todoController.createTodo.bind(todoController)),
);

todosRouter.patch(
	'/:id',
	isExist('todo'),
	tryCatchWrapper(todoController.updateTodo.bind(todoController)),
);

todosRouter.delete(
	'/:id',
	isExist('todo'),
	tryCatchWrapper(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
