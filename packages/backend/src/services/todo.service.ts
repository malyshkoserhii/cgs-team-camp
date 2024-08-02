import { Todo, User } from '@prisma/client';
import prisma from '@/client';

export default class TodoService {
	async findAll(userId: number): Promise<Todo[]> {
		return await prisma.todo.findMany({
			where: {
				OR: [{ isPrivate: false }, { userId }],
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async create(todo: Todo, user: User): Promise<Todo> {
		return await prisma.todo.create({
			data: {
				...todo,
				userId: user.id,
			},
		});
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
