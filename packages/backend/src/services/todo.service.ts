import { Prisma, Todo } from '@prisma/client';
import { ITodo, TodoFilters } from '../types/todos.type';
import Service from './index.service';
import { prismaClient } from '@/modules/prisma';

export default class TodoService extends Service {
	todoRepository = prismaClient.todo;
	selectTemplate: Prisma.TodoSelect = {
		id: true,
		title: true,
		description: true,
		private: true,
		userId: true,
	};

	async findAll(
		filter: TodoFilters,
		search: string,
		page: number,
	): Promise<{ todos: Todo[]; totalCount: number }> {
		const findArgs: Prisma.TodoFindManyArgs = {
			where: { title: { contains: search } },
			skip: (page - 1) * 10,
			take: 10,
			orderBy: { id: 'desc' },
			select: this.selectTemplate,
		};

		const [count, todos] = await prismaClient.$transaction([
			this.todoRepository.count({ where: findArgs.where }),
			this.todoRepository.findMany(findArgs),
		]);

		return { todos, totalCount: count };
	}

	async findOne(todoId: number): Promise<Todo> {
		const existTodo = await this.todoRepository.findFirstOrThrow({
			where: { id: todoId },
		});

		return existTodo;
	}

	async create({ creatorId, ...todo }: ITodo): Promise<Todo> {
		const newTodo = this.todoRepository.create({
			data: {
				...todo,
				user: {
					connect: {
						id: creatorId,
					},
				},
			},
			select: this.selectTemplate,
		});

		return newTodo;
	}

	async update(todoId: number, todo: ITodo): Promise<Todo> {
		const existTodo = await this.todoRepository.update({
			where: {
				id: todoId,
			},
			data: todo,
			select: this.selectTemplate,
		});

		return existTodo;
	}

	async deleteOne(todoId: number): Promise<Todo> {
		const deletedTodo = await this.todoRepository.delete({
			where: { id: todoId },
		});

		return deletedTodo;
	}
}
