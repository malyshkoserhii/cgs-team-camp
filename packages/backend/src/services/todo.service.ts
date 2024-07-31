import { PrismaClient, Todo } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();
export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return await prisma.todo.findMany();
	}

	async findById(id: number): Promise<Todo | null> {
		return await prisma.todo.findUnique({ where: { id } });
	}

	async create(
		data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<Todo> {
		return await prisma.todo.create({ data });
	}

	async update(
		id: number,
		data: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>,
	): Promise<Todo | null> {
		try {
			return await prisma.todo.update({
				where: { id },
				data,
			});
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			) {
				return null;
			}
			throw error;
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			await prisma.todo.delete({ where: { id } });
			return true;
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			) {
				return false;
			}
			throw error;
		}
	}
}
