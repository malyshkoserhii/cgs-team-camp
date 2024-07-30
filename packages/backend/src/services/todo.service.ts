import { prismaClient } from '@/prisma/prismaClient';
import { Todo } from '@/types/todos.type';

export default class TodoService {
	async createTodo(data: Todo): Promise<Todo> {
		return prismaClient.todo.create({ data });
	}

	async findTodos(): Promise<Todo[]> {
		return prismaClient.todo.findMany();
	}

	async findTodoById(id: string): Promise<Todo | null> {
		return prismaClient.todo.findUnique({ where: { id } });
	}

	async updateTodo(id: string, data: Todo): Promise<Todo | null> {
		return prismaClient.todo.update({ where: { id }, data });
	}

	async deleteTodo(id: string): Promise<Todo | null> {
		return prismaClient.todo.delete({ where: { id } });
	}
}
