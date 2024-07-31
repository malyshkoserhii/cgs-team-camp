import { Router } from 'express';
import { isExists } from '@/middleware/isExist.middleware';
import { validateBodyMiddleware } from '@/middleware/validateBody.middleware';
import { Entities } from '@/utils/enums/Entities.enum';
import { todoSchema } from '@/utils/joiSchemas/todo/todo.schema';
import { todoStatusUpdate } from '@/utils/joiSchemas/todo/todoStatusUpdate.schema';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('/all', todoController.getAllTodo.bind(todoController));
todosRouter.get(
	'/:id',
	isExists(Entities.TODO),
	todoController.findById.bind(todoController),
);
todosRouter.post(
	'/',
	validateBodyMiddleware(todoSchema),
	todoController.create.bind(todoController),
);
todosRouter.put(
	'/:id',
	isExists(Entities.TODO),
	validateBodyMiddleware(todoSchema),
	todoController.updateById.bind(todoController),
);
todosRouter.patch(
	'/:id',
	isExists(Entities.TODO),
	validateBodyMiddleware(todoStatusUpdate),
	todoController.updateById.bind(todoController),
);
todosRouter.delete('/:id', todoController.deleteById.bind(todoController));

export default todosRouter;
