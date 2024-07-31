import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { ctrlWrapper } from '@/middlewares/ctrlWrapper';
import { validateBody } from '@/middlewares/validateBody';
import { creatingSchema, updatingSchema } from '@/validation/todo';
import { isValidId } from '@/middlewares/validateId';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	ctrlWrapper(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
	'/find/:id',
	isValidId,
	ctrlWrapper(todoController.getById.bind(todoController)),
);

todosRouter.post(
	'/create',
	validateBody(creatingSchema),
	ctrlWrapper(todoController.createTodo.bind(todoController)),
);

todosRouter.delete(
	'/delete/:id',
	isValidId,
	ctrlWrapper(todoController.deleteTodo.bind(todoController)),
);

todosRouter.put(
	'/update/:id',
	isValidId,
	validateBody(updatingSchema),
	ctrlWrapper(todoController.updateTodo.bind(todoController)),
);

export default todosRouter;
