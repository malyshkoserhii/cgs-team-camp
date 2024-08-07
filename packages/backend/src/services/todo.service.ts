import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

export class TodoService {
	async getAllTodos(userId: number): Promise<Todo[]> {
		return prisma.todo.findMany({
			where: {
				OR: [{ userId: userId }, { public: true }],
			},
		});
	}

	async getTodosByUserId(userId: number): Promise<Todo[]> {
		return prisma.todo.findMany({
			where: { userId },
		});
	}

	async getTodoById(id: number, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || (!todo.public && todo.userId !== userId)) {
			return null;
		}

		return todo;
	}

	async createTodo(data: Omit<Todo, 'id'>): Promise<Todo> {
		return prisma.todo.create({ data });
	}

	async updateTodo(
		id: number,
		userId: number,
		data: Partial<Todo>,
	): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || todo.userId !== userId) {
			return null;
		}

		return prisma.todo.update({
			where: { id },
			data,
		});
	}

	async deleteTodo(id: number, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || todo.userId !== userId) {
			return null;
		}

		return prisma.todo.delete({ where: { id } });
	}
}
