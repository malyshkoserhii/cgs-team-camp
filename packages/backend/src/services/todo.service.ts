import { TodoType } from '@/types/todos.type';
import prisma from '@/utils/db';

export default class TodoService {
	async findAll(): Promise<TodoType[] | null> {
		const todos = prisma.todo.findMany({
			where: {
				OR: [
					{
						isPrivate: {
							equals: false,
						},
					},
				],
			},
		});

		if (todos) {
			return todos;
		}

		return null;
	}

	async getById(id: string): Promise<TodoType | null> {
		const todo = await prisma.todo.findUnique({
			where: {
				id,
			},
		});

		if (todo) {
			return todo;
		}

		return null;
	}

	async addTodo(
		title: string,
		text: string,
		isCompleted: boolean,
		isPrivate: boolean,
	): Promise<TodoType | null> {
		const newTodo = await prisma.todo.create({
			data: {
				title,
				text,
				isCompleted,
				isPrivate,
			},
		});

		return newTodo;
	}
}
