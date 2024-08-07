import { Router } from 'express';
import { TodoController } from '../../controllers/todo.controller';
import { validateBody } from '../../middleware/validator.middleware';
import { isExist } from '../../middleware/isExist.middleware';
import { tryCatch } from '../../middleware/tryCatch.middleware';
import { todoSchema } from '../../schemas/todo.schema';
import {
	authenticateJwt,
	authorizeUser,
} from '../../middleware/auth.middleware';

const todosRouter = Router();
const todoController = new TodoController();

todosRouter.use(authenticateJwt);

todosRouter.get('/all', tryCatch(todoController.getAllTodos));

todosRouter.get('/my', tryCatch(todoController.getMyTodos));

todosRouter.get('/:id', isExist('todo'), tryCatch(todoController.getTodoById));

todosRouter.post(
	'/',
	validateBody(todoSchema),
	tryCatch(todoController.createTodo),
);

todosRouter.put(
	'/:id',
	isExist('todo'),
	authorizeUser,
	validateBody(todoSchema),
	tryCatch(todoController.updateTodo),
);

todosRouter.delete(
	'/:id',
	isExist('todo'),
	authorizeUser,
	tryCatch(todoController.deleteTodo),
);

export default todosRouter;
