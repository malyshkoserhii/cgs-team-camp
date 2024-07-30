import { TodoType } from '@/types/todos.type';
import prisma from '@/utils/db';

export default class TodoService {
	async findAll(): Promise<string> {
		return 'Todos';
	}

	async addTodo(
		title: string,
		text: string,
		isCompleted: boolean,
	): Promise<TodoType | null> {
		const newTodo = await prisma.todo.create({
			data: {
				title,
				text,
				isCompleted,
			},
		});

		return newTodo;
	}
}
