import { Todo, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return await prisma.todo.findMany();
	}

	async findOne(id: number): Promise<Todo | null> {
		return await prisma.todo.findUnique({ where: { id } });
	}

	async createTodo(body: Todo): Promise<Todo> {
		return await prisma.todo.create({ data: body });
	}

	async updateTodo(body: Partial<Todo>, id: number): Promise<Todo> {
		return await prisma.todo.update({ where: { id }, data: body });
	}

	async deleteTodo(id: number): Promise<Todo> {
		return prisma.todo.delete({ where: { id } });
	}
}
