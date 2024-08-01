import { Router } from 'express';
import todoController from '@/controllers/todo.controller';

const todoRouter = Router();

todoRouter.get('/', todoController.getTodoItem.bind(todoController));
todoRouter.post('/create', todoController.createTodoItem.bind(todoController));
todoRouter.put(
	'/update/:id',
	todoController.updateTodoItem.bind(todoController),
);
todoRouter.delete(
	'/delete/:id',
	todoController.deleteTodoItem.bind(todoController),
);

export default todoRouter;
