import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('/all', todoController.getAllTodo.bind(todoController));

export default todosRouter;
