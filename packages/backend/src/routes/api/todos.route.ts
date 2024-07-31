import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { ctrlWrapper } from '@/middlewares/ctrlWrapper';
import { validateBody } from '@/middlewares/validateBody';
import { creatingSchema } from '@/validation/todo';
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

export default todosRouter;
