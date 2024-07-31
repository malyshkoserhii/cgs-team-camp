import { Request, Response, NextFunction } from 'express';
import TodoService from '@/services/todo.service';

const todoService = new TodoService();

const isExist = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const todo = await todoService.findById(parseInt(req.params.id, 10));
		if (!todo) {
			res.status(404).json({ message: 'Todo not found' });
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

export default isExist;
