import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();
export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return prisma.todo.findMany();
	}

	async findById(id: number): Promise<Todo | null> {
		return prisma.todo.findUnique({ where: { id: id } });
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

	async update(id: number, data: Partial<Todo>): Promise<Todo> {
		return await prisma.todo.update({
			where: { id },
			data,
		});
	}

	async delete(id: number): Promise<void> {
		await prisma.todo.delete({ where: { id } });
	}
}
