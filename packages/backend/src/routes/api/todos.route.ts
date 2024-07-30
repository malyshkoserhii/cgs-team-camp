import { Router } from 'express';
import {
	ctrAddNewTodo,
	ctrDeleteTodoById,
	ctrGetAllTodo,
	ctrGetTodoById,
	ctrUpdateTodoById,
} from '@/controllers';

// import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.post('/create', ctrAddNewTodo);
todosRouter.get('/all', ctrGetAllTodo);
todosRouter.get('/todo/:id', ctrGetTodoById);
todosRouter.put('/todo/:id', ctrUpdateTodoById);
todosRouter.delete('/todo/:id', ctrDeleteTodoById);

export default todosRouter;
