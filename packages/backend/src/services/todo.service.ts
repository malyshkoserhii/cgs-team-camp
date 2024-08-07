import { PrismaClient, Prisma, Todo, TodoStatus } from '@prisma/client';

export default class TodoService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(
		newTodo: Omit<Prisma.TodoCreateInput, 'user'>,
		userId: string,
	): Promise<Todo> {
		return this.prisma.todo.create({
			data: {
				...newTodo,
				user: {
					connect: { id: userId },
				},
			},
		});
	}

	async update(
		id: string,
		data: Omit<Prisma.TodoUpdateInput, 'user'>,
		userId: string,
	): Promise<Todo | null> {
		const todo = await this.prisma.todo.findUnique({ where: { id } });
		if (!todo || todo.userId !== userId) {
			return null;
		}
		return this.prisma.todo.update({ where: { id }, data });
	}

	async findAll(
		userId: string,
		filters: {
			search?: string;
			isPrivate?: boolean;
			status?: TodoStatus;
		},
	): Promise<Todo[]> {
		const { search, isPrivate, status } = filters;
		const where: Prisma.TodoWhereInput = {
			OR: [{ userId }, { isPrivate: false }],
		};

		if (search) {
			where.name = { contains: search, mode: 'insensitive' };
		}

		if (isPrivate !== undefined) {
			where.AND = [{ isPrivate: isPrivate, userId }];
		}

		if (status) {
			where.status = status;
		}

		return this.prisma.todo.findMany({ where });
	}

	async findById(id: string, userId: string): Promise<Todo | null> {
		const todo = await this.prisma.todo.findUnique({ where: { id } });
		if (!todo || (todo.isPrivate && todo.userId !== userId)) {
			return null;
		}
		return todo;
	}

	async delete(id: string, userId: string): Promise<Todo | null> {
		const todo = await this.prisma.todo.findUnique({ where: { id } });
		if (!todo || todo.userId !== userId) {
			return null;
		}
		return this.prisma.todo.delete({ where: { id } });
	}
}
