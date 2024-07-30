import { GetAllTodosType } from '@/types/todos.type';
import { prisma } from './prisma/prisma.service';

export default class TodoService {
	async findAll(): Promise<GetAllTodosType> {
		const todos = await prisma.todoItem.findMany();
		return todos;
	}
}
