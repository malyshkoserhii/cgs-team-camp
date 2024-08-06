import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();
export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return prisma.todo.findMany();
	}

	async findByUserId(userId: number): Promise<Todo[]> {
		return prisma.todo.findMany({ where: { userId: userId } });
	}

	async findById(id: number, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id: id } });

		if (!todo) {
			throw new Error('Todo not found');
		}

		if (todo.isPrivate && todo.userId !== userId) {
			throw new Error('Unauthorized');
		}

		return todo;
	}

	async getPublicTodos(): Promise<Todo[]> {
		return prisma.todo.findMany({ where: { isPrivate: false } });
	}

	async create(
		data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<Todo> {
		return await prisma.todo.create({
			data: {
				title: data.title,
				description: data.description,
				completed: data.completed,
				user: { connect: { id: data.userId } },
			},
		});
	}

	async update(
		id: number,
		data: Partial<Todo>,
		userId: number,
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

	async delete(id: number, userId: number): Promise<void> {
		const todo = await prisma.todo.findUnique({ where: { id } });
		if (!todo || todo.userId !== userId) {
			throw new Error('Unauthorized');
		}
	}
}
