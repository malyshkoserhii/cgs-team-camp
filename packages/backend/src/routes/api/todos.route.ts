import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import middlewares from '@/middlewares/middlewares';

const todosRouter: Router = Router();

todosRouter.get('/all', todoController.getAllTodo.bind(todoController));

todosRouter.post(
	'/create',
	middlewares.tryCatch(todoController.createTodo.bind(todoController)),
);

export default todosRouter;
