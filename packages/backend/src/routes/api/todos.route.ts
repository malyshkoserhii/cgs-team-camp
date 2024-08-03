import { Router } from 'express';
import { authenticateJwt } from '@/middleware/auth.middleware';
import { isExists } from '@/middleware/isExist.middleware';
import { optionalAuthenticateJwt } from '@/middleware/optionalAuthenticateJwt.middleware';
import { checkPermission } from '@/middleware/permission.middleware';
import { validateBodyMiddleware } from '@/middleware/validateBody.middleware';
import { Entities } from '@/utils/enums/Entities.enum';
import { todoSchema } from '@/utils/joiSchemas/todo/todo.schema';
import { todoStatusUpdate } from '@/utils/joiSchemas/todo/todoStatusUpdate.schema';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	optionalAuthenticateJwt,
	todoController.getAllTodo.bind(todoController),
);
todosRouter.get(
	'/:id',
	isExists(Entities.TODO),
	todoController.findById.bind(todoController),
);
todosRouter.post(
	'/',
	authenticateJwt,
	validateBodyMiddleware(todoSchema),
	todoController.create.bind(todoController),
);
todosRouter.put(
	'/:id',
	authenticateJwt,
	isExists(Entities.TODO),
	checkPermission(),
	validateBodyMiddleware(todoSchema),
	todoController.updateById.bind(todoController),
);
todosRouter.patch(
	'/:id',
	authenticateJwt,
	isExists(Entities.TODO),
	checkPermission(),
	validateBodyMiddleware(todoStatusUpdate),
	todoController.updateById.bind(todoController),
);
todosRouter.delete(
	'/:id',
	authenticateJwt,
	isExists(Entities.TODO),
	checkPermission(),
	todoController.deleteById.bind(todoController),
);

export default todosRouter;
