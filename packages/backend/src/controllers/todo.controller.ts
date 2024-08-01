import { Request, Response } from 'express';
import TodoService from '@/services/todo.service';
import {
	TodoCreateType,
	TodoUpdateType,
	TodoItemFindingType,
} from '@/types/todos.type';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getTodoItem(req: Request, res: Response): Promise<void> {
		const query = req.query as unknown as TodoItemFindingType;
		const todos = await this.todoService.find(query);
		res.send(todos);
	}

	async createTodoItem(req: Request, res: Response): Promise<void> {
		try {
			const todoData: TodoCreateType = req.body;
			const newTodo = await this.todoService.create(todoData);
			res.status(201).send(newTodo);
		} catch (err) {
			console.error(err);
			res.status(500).send({ error: 'Failed to create todo item' });
		}
	}

	async updateTodoItem(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id, 10);
		const updateData: TodoUpdateType = { id, ...req.body };

		try {
			const updatedTodo = await this.todoService.update(updateData);
			res.send(updatedTodo);
		} catch (err) {
			console.error(err);
			res.status(500).send({ error: 'Failed to update todo item' });
		}
	}

	async deleteTodoItem(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id, 10);

		try {
			const deletedTodo = await this.todoService.delete(id);
			res.status(200).send(deletedTodo);
		} catch (err) {
			console.error(err);
			res.status(500).send({ error: 'Failed to delete todo item' });
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
