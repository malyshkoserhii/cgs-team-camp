import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import {
	isExistObject,
	validateBody,
} from '@/middlewares/validator.middleware';
import { todoValidationSchema } from '@/validations/todo.validations';

const todosRouter: Router = Router();

todosRouter.get('', todoController.GetAll.bind(todoController));
todosRouter.get(
	'/one/:id',
	isExistObject('post'),
	todoController.GetOne.bind(todoController),
);
todosRouter.post(
	'',
	validateBody(todoValidationSchema),
	todoController.Create.bind(todoController),
);

todosRouter.put(
	'/:id',
	isExistObject('post'),
	validateBody(todoValidationSchema),
	todoController.Update.bind(todoController),
);

todosRouter.delete(
	'/:id',
	isExistObject('post'),
	todoController.Delete.bind(todoController),
);
export default todosRouter;
