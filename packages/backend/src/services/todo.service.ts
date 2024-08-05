import {
	CreateTodoType,
	GetAllTodosType,
	TodoType,
	UpdateTodoType,
} from '@/types/todos.type';
import { UserType } from '@/types/user.types';
import { prisma } from './prisma/prisma.service';

export default class TodoService {
	async findAll(user: UserType): Promise<GetAllTodosType> {
		const todos = await prisma.todoItem.findMany({
			where: { authorId: user.id },
		});
		return todos;
	}
	async createTodo(user: UserType, data: CreateTodoType): Promise<TodoType> {
		return prisma.todoItem.create({
			data: {
				...data,
				authorId: user.id,
			},
		});
	}
	async updateTodo(id: number, data: UpdateTodoType): Promise<TodoType> {
		const todo = await prisma.todoItem.update({ where: { id }, data });
		return todo;
	}
	async deleteTodo(id: number): Promise<TodoType> {
		const todo = await prisma.todoItem.delete({ where: { id } });
		return todo;
	}
	async getTodoById(id: number): Promise<TodoType> {
		const todo = await prisma.todoItem.findUniqueOrThrow({ where: { id } });
		return todo;
	}
}
