import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export class TodoService {
	async getAllTodos(): Promise<Todo[]> {
		return prisma.todo.findMany();
	}

	async getTodoById(id: number): Promise<Todo | null> {
		return prisma.todo.findUnique({ where: { id } });
	}

	async createTodo(data: Omit<Todo, 'id'>): Promise<Todo> {
		return prisma.todo.create({ data });
	}

	async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
		return prisma.todo.update({ where: { id }, data });
	}

	async deleteTodo(id: number): Promise<Todo> {
		return prisma.todo.delete({ where: { id } });
	}
}
