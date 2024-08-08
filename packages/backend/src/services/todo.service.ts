import { prismaClient } from '@/prisma/prismaClient';
import { Todo } from '@/types';
import { Prisma, User } from '@prisma/client';

export default class TodoService {
	async createTodo(data: Todo): Promise<Todo> {
		return prismaClient.todo.create({ data });
	}

	async findTodos(): Promise<Todo[]> {
		return prismaClient.todo.findMany();
	}

	async findAll(
		user: User,
		query: {
			search?: string;
			isPrivate?: boolean;
			isCompleted?: boolean;
		},
	): Promise<Todo[]> {
		return prismaClient.todo.findMany({
			where: {
				AND: [
					{
						title: {
							contains: query.search,
							mode: 'insensitive',
						},
					},
					{ isPrivate: query.isPrivate },
					{ isCompleted: query.isCompleted },
					{
						OR: [{ userId: user.id }, { isPrivate: false }],
					},
				],
			},
		});
	}

	async findFilteredTodos(
		// user: User,
		query: {
			search?: string;
			isCompleted?: boolean; // status
			isPrivate?: boolean; // public
			// public?: boolean;
			userId: string;

			page?: number;
			pageSize?: number;
		},
	): Promise<{ todos: Todo[]; total: number }> {
		const {
			search,
			isCompleted,
			isPrivate, //
			userId,
			page = 1,
			pageSize = 5,
		} = query;

		// let completedStatus: boolean | undefined;
		// if (status === 'completed') completedStatus = true;
		// else if (status === 'active') completedStatus = false;
		const completedStatus = isCompleted
			? true
			: !isCompleted
				? false
				: undefined;

		const privateStatus = isPrivate ? true : !isPrivate ? false : undefined;

		const where = {
			OR: [{ userId }, { isPrivate: false }],
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
				// orderBy: { createdAt: 'DESC' },
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
