import { Todo } from '@prisma/client';
import prisma from '@/client';

export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return await prisma.todo.findMany();
	}

	async create(todo: Todo): Promise<Todo> {
		return await prisma.todo.create({ data: todo });
	}

	async updateById(id: number, data: Todo): Promise<Todo | void> {
		return await prisma.todo.update({
			where: { id },
			data,
		});
	}

	async deleteById(id: number): Promise<void> {
		await prisma.todo.delete({
			where: { id },
		});
	}

	async changeStatusById(
		id: number,
		status: Todo['status'],
	): Promise<Todo | void> {
		return await prisma.todo.update({
			where: { id },
			data: { status },
		});
	}
}
