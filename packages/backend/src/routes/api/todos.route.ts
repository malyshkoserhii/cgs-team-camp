import { Router } from 'express';

import TodoService from '../../services/todo.service';
import todoController from '../../controllers/todo.controller';
import {
	validateRequestBody,
	isExist,
	tryCatch,
} from '../middlewares/utils.middlewares';
import { todoValidationBodySchema } from '../middlewares/validation.schemas';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	tryCatch(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
	'/:id',
	isExist(TodoService),
	tryCatch(todoController.getTodo.bind(todoController)),
);

todosRouter.post(
	'/create',
	validateRequestBody(todoValidationBodySchema),
	tryCatch(todoController.createTodo.bind(todoController)),
);

todosRouter.put(
	'/update/:id',
	isExist(TodoService),
	validateRequestBody(todoValidationBodySchema),
	tryCatch(todoController.updateTodo.bind(todoController)),
);

todosRouter.delete(
	'/delete/:id',
	isExist(TodoService),
	tryCatch(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
