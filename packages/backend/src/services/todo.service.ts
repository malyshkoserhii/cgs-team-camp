import {
	CreateTodoType,
	GetAllTodosType,
	TodoType,
	UpdateTodoType,
} from '@/types/todos.type';
import { prisma } from './prisma/prisma.service';

export default class TodoService {
	async findAll(): Promise<GetAllTodosType> {
		const todos = await prisma.todoItem.findMany();
		return todos;
	}
	async createTodo(data: CreateTodoType): Promise<TodoType> {
		const todo = await prisma.todoItem.create({ data });
		return todo;
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
