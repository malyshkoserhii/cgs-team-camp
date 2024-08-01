import { PrismaClient } from '@prisma/client';
import {
	TodoCreateType,
	TodoUpdateType,
	TodoItemFindingType,
	TodoType,
} from '@/types/todos.type';

const prisma = new PrismaClient();

export default class TodoService {
	async find(queryParams?: TodoItemFindingType): Promise<Array<TodoType>> {
		try {
			const whereConditions: {
				status?: string;
				dashboardId?: number;
				name?: { contains: string; mode: 'insensitive' };
			} = {};

			if (queryParams) {
				const { status, dashboard, find } = queryParams;

				if (status) {
					whereConditions.status = status;
				}

				if (dashboard) {
					whereConditions.dashboardId = Number(dashboard);
				}

				if (find) {
					whereConditions.name = {
						contains: find,
						mode: 'insensitive',
					};
				}
			}

			return await prisma.todoItem.findMany({
				where: whereConditions,
			});
		} catch (err) {
			console.error('Error fetching todo items:', err);
			throw new Error('Failed to retrieve todo items');
		}
	}

	async create(data: TodoCreateType): Promise<TodoType> {
		try {
			const newTodo = await prisma.todoItem.create({
				data: {
					name: data.name,
					date: new Date(),
					status: data.status || 'ToDo',
					descr: data.descr,
					updateTime: null,
					dashboardId: Number(data.dashboardId),
					userId: Number(data.userId),
				},
			});
			return newTodo;
		} catch (err) {
			console.error('Error creating todo item:', err);
			throw new Error('Failed to create todo item');
		}
	}

	async update(data: TodoUpdateType): Promise<TodoType> {
		try {
			const existingTodo = await prisma.todoItem.findUnique({
				where: {
					id: data.id,
				},
			});

			if (!existingTodo) {
				throw new Error('Todo item not found');
			}

			const updatedTodo = await prisma.todoItem.update({
				where: {
					id: data.id,
				},
				data: {
					...data,
					date: existingTodo.date,
					status: data.status || existingTodo.status,
					updateTime: new Date(),
				},
			});
			return updatedTodo;
		} catch (err) {
			console.error('Error updating todo item:', err);
			throw new Error('Failed to update todo item');
		}
	}

	async delete(id: number): Promise<TodoType> {
		try {
			const existingTodo = await prisma.todoItem.findUnique({
				where: {
					id: id,
				},
			});

			if (!existingTodo) {
				throw new Error('Todo item not found');
			}

			const deletedTodo = await prisma.todoItem.delete({
				where: {
					id: id,
				},
			});
			return deletedTodo;
		} catch (err) {
			console.error('Error deleting todo item:', err);
			throw new Error('Failed to delete todo item');
		}
	}
}
