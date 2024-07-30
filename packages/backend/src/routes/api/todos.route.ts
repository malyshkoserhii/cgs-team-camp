import { Router } from 'express';

import { ctrlWrapper } from '@/helpers/ctrlWrapper';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	ctrlWrapper(todoController.getAllTodo.bind(todoController)),
);

export default todosRouter;
