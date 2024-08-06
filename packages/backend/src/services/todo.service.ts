import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();
export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return prisma.todo.findMany();
	}

	async getPublicTodos(): Promise<Todo[]> {
		return prisma.todo.findMany({
			where: {
				isPrivate: false,
			},
		});
	}

	async getTodosByUserId(userId: number): Promise<Todo[]> {
		return prisma.todo.findMany({
			where: {
				userId: userId,
			},
		});
	}

	async findById(id: number, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({
			where: { id: id },
			select: {
				id: true,
				title: true,
				description: true,
				completed: true,
				createdAt: true,
				updatedAt: true,
				isPrivate: true,
				userId: true,
			},
		});

		if (!todo) {
			throw new Error('Todo not found');
		}

		if (todo.isPrivate && todo.userId !== userId) {
			return null;
		}

		return todo;
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
				isPrivate: data.isPrivate,
			},
		});
	}

	async update(
		id: number,
		userId: number,
		data: Partial<Todo>,
	): Promise<Todo> {
		const todo = await prisma.todo.findUnique({
			where: { id: id },
			select: {
				userId: true,
				isPrivate: true,
			},
		});

		if (!todo) {
			throw new Error('Todo not found');
		}

		if (todo.isPrivate && todo.userId !== userId) {
			throw new Error('Not authorized to update this todo');
		}

		return await prisma.todo.update({
			where: { id },
			data,
		});
	}

	async delete(id: number, userId: number): Promise<void> {
		const todo = await prisma.todo.findUnique({
			where: { id: id },
			select: {
				userId: true,
				isPrivate: true,
			},
		});

		if (!todo) {
			throw new Error('Todo not found');
		}

		if (todo.isPrivate && todo.userId !== userId) {
			throw new Error('Not authorized to delete this todo');
		}

		await prisma.todo.delete({ where: { id } });
	}
}
