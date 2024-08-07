import { Todo, User } from '@prisma/client';
import prisma from '@/client';
import { getQueryParamsTodos } from '@/utils/helpers/query/getQueryParamsTodos';
import { TodoFilterParams } from '@/utils/types/todos.type';

export default class TodoService {
	async findAll(
		userId: number,
		params: TodoFilterParams,
	): Promise<{ todos: Todo[]; totalPages: number; hasMore: boolean }> {
		const { query, pagination } = getQueryParamsTodos(params);

		const [totalCount, todos] = await prisma.$transaction([
			prisma.todo.count({
				where: {
					OR: [{ isPrivate: false }, { userId }],
					...query,
				},
			}),
			prisma.todo.findMany({
				where: {
					OR: [{ isPrivate: false }, { userId }],
					...query,
				},
				orderBy: {
					createdAt: 'desc',
				},
				skip: pagination.skip,
				take: pagination.take,
			}),
		]);

		const totalPages = Math.ceil(totalCount / pagination.take);
		const hasMore = pagination.skip + todos.length < totalCount;

		return { todos, totalPages, hasMore };
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
