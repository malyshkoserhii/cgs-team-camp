import { PrismaClient, Prisma, Todo } from '@prisma/client';

export default class TodoService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(newTodo: Prisma.TodoCreateInput): Promise<Todo> {
		return this.prisma.todo.create({ data: newTodo });
	}

	async update(
		id: string,
		data: Prisma.TodoUpdateInput,
	): Promise<Todo | null> {
		return this.prisma.todo.update({ where: { id }, data });
	}

	async findAll(): Promise<Todo[]> {
		return this.prisma.todo.findMany();
	}

	async findById(id: string): Promise<Todo | null> {
		return this.prisma.todo.findUnique({ where: { id } });
	}

	async delete(id: string): Promise<Todo> {
		return this.prisma.todo.delete({ where: { id } });
	}
}
