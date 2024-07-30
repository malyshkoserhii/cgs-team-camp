import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import validate from '../../middlewares/validate';
import { todoSchema } from '../../validators/todoValidator';

const todosRouter: Router = Router();

todosRouter.get('/all', todoController.getAllTodo.bind(todoController));
todosRouter.get('/:id', todoController.getTodoById.bind(todoController));
todosRouter.post(
	'/',
	validate(todoSchema),
	todoController.createTodo.bind(todoController),
);
todosRouter.put(
	'/:id',
	validate(todoSchema),
	todoController.updateTodo.bind(todoController),
);
todosRouter.delete('/:id', todoController.deleteTodo.bind(todoController));

export default todosRouter;
