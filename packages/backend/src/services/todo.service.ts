import { NotFoundError, ValidationError } from '@/middlewares/customErrors';
import { PrismaClient, Todo } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();
export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return await prisma.todo.findMany();
	}

	async findById(id: number): Promise<Todo> {
		const todo = await prisma.todo.findUnique({ where: { id: id } });
		if (!todo) {
			throw new NotFoundError('Todo not found');
		}
		return todo;
	}

	async create(
		data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<Todo> {
		if (!data.title) {
			throw new ValidationError('Title is required');
		}
		return await prisma.todo.create({
			data: {
				title: data.title,
				description: data.description,
				completed: data.completed,
			},
		});
	}

	async update(id: number, data: Partial<Todo>): Promise<Todo> {
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
				throw new NotFoundError('Todo not found');
			}
			throw error;
		}
	}

	async delete(id: number): Promise<void> {
		try {
			await prisma.todo.delete({ where: { id } });
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2025'
			) {
				throw new NotFoundError('Todo not found');
			}
			throw error;
		}
	}
}
