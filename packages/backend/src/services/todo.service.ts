import { TodosPerPage } from '@/constants/todos-per-page.constant';
import {
	CreateTodoType,
	GetAllTodoQuery,
	GetAllTodosType,
	TodoType,
	UpdateTodoType,
} from '@/types/todos.type';
import { UserType } from '@/types/user.types';
import { prisma } from './prisma/prisma.service';

export default class TodoService {
	async findAll(
		user: UserType,
		query: GetAllTodoQuery,
	): Promise<GetAllTodosType> {
		const queryPage = query.page ?? 1;
		const skip = TodosPerPage * (queryPage - 1);

		const result = await prisma.todoItem.findMany({
			where: {
				AND: [
					{
						title: {
							contains: query.search,
							mode: 'insensitive',
						},
					},
					{ isCompleted: query.isCompleted },
					{ isPrivate: query.isPrivate },
					{
						OR: [{ authorId: user.id }, { isPrivate: false }],
					},
				],
			},
			skip: skip,
			take: TodosPerPage + 1,
		});
		const alltodos = await prisma.todoItem.findMany({
			where: {
				AND: [
					{
						title: {
							contains: query.search,
							mode: 'insensitive',
						},
					},
					{ isCompleted: query.isCompleted },
					{ isPrivate: query.isPrivate },
					{
						OR: [{ authorId: user.id }, { isPrivate: false }],
					},
				],
			},
		});
		const pages = Math.ceil(alltodos.length / TodosPerPage);

		return {
			todos: result.slice(0, TodosPerPage),
			isLastPage: result.length !== TodosPerPage + 1,
			pages: pages,
		};
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
