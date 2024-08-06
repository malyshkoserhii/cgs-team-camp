import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { validateBody } from '@/middleware/validation.middleware';
import { todoSchema } from '@/utils/validationSchemas/todo.schema';
import { tryCatchWrapper } from '@/middleware/tryCatch.middleware';
import { isExist } from '@/middleware/isExist.middleware';
import { jwtAuth } from '@/middleware/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	jwtAuth,
	tryCatchWrapper(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
	'/:id',
	jwtAuth,
	isExist('todo'),
	tryCatchWrapper(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/',
	jwtAuth,
	validateBody(todoSchema),
	tryCatchWrapper(todoController.createTodo.bind(todoController)),
);

todosRouter.patch(
	'/:id',
	jwtAuth,
	isExist('todo'),
	tryCatchWrapper(todoController.updateTodo.bind(todoController)),
);

todosRouter.delete(
	'/:id',
	jwtAuth,
	isExist('todo'),
	tryCatchWrapper(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
