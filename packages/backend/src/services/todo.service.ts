import { prismaClient } from '@/prisma/prismaClient';
import { Todo } from '@/types';
import { User } from '@prisma/client';

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
						OR: [{ userId: user.id }, { isPrivate: false }],
					},
					{
						title: {
							contains: query.search,
							mode: 'insensitive',
						},
					},
					{ isPrivate: query.isPrivate },
					{ isCompleted: query.isCompleted },
				],
			},
		});
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
