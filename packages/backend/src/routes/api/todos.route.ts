import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { validateBodyMiddleware } from '@/middleware/validateBody.middleware';
import { todoSchema } from '@/utils/joiSchemas/todo/todo.schema';
import { todoStatusUpdate } from '@/utils/joiSchemas/todo/todoStatusUpdate.schema';

const todosRouter: Router = Router();

todosRouter.get('/all', todoController.getAllTodo.bind(todoController));
todosRouter.get('/:id', todoController.findById.bind(todoController));
todosRouter.post(
	'/',
	validateBodyMiddleware(todoSchema),
	todoController.create.bind(todoController),
);
todosRouter.put(
	'/:id',
	validateBodyMiddleware(todoSchema),
	todoController.updateById.bind(todoController),
);
todosRouter.patch(
	'/:id',
	validateBodyMiddleware(todoStatusUpdate),
	todoController.updateById.bind(todoController),
);
todosRouter.delete('/:id', todoController.deleteById.bind(todoController));

export default todosRouter;
