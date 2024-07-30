import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.post('/create', todoController.addNewTodo.bind(todoController));
todosRouter.get('/all', todoController.getAllTodo.bind(todoController));
todosRouter.get('/todo/:id', todoController.getTodoById.bind(todoController));
todosRouter.put(
	'/todo/:id',
	todoController.updateTodoById.bind(todoController),
);
todosRouter.delete(
	'/todo/:id',
	todoController.deleteTodoById.bind(todoController),
);

export default todosRouter;
