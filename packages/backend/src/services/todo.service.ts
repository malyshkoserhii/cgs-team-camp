import { prismaClient } from '@/prisma/prismaClient';
import { Todo } from '@/types';
import { Prisma } from '@prisma/client';

export default class TodoService {
	async createTodo(data: Todo): Promise<Todo> {
		return prismaClient.todo.create({ data });
	}

	async findFilteredTodos(query: {
		userId: string;
		search?: string;
		statusComplete?: 'completed' | 'active' | undefined;
		statusPrivate?: 'private' | 'public' | undefined;

		page?: number;
		pageSize?: number;
	}): Promise<{ todos: Todo[]; total: number }> {
		const {
			search,
			statusComplete,
			statusPrivate,
			userId,
			page = 1,
			pageSize = 5,
		} = query;

		const completedStatus =
			statusComplete === 'completed'
				? true
				: statusComplete === 'active'
					? false
					: undefined;

		const privateStatus =
			statusPrivate === 'private'
				? true
				: statusPrivate === 'public'
					? false
					: undefined;
		console.log('privateStatus: ', privateStatus);

		const where = {
			userId: privateStatus === true ? userId : undefined,
			OR:
				privateStatus === false
					? [{ userId }, { isPrivate: false }]
					: undefined,
			title: search
				? { contains: search, mode: 'insensitive' as Prisma.QueryMode }
				: undefined,
			isCompleted: completedStatus,
			isPrivate: privateStatus,
		};

		const skip = (page - 1) * pageSize;

		const [todos, total] = await Promise.all([
			prismaClient.todo.findMany({
				where,
				skip,
				take: pageSize,
			}),

			prismaClient.todo.count({ where }),
		]);
		return { todos, total };
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

	async findTodoByTitle(title: string): Promise<Todo | null> {
		return prismaClient.todo.findUnique({ where: { title } });
	}

	async updateTodoField(
		id: string,
		field: Partial<Todo>,
	): Promise<Todo | null> {
		return prismaClient.todo.update({
			where: { id },
			data: field,
		});
	}
}
