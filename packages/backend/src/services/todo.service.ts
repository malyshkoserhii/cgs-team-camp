import prisma from '@/client';
import { Entities } from '@/utils/enums/Entities.enum';
import { entityIsExist } from '@/utils/helpers/isExist.helper';
import { Todo } from '@prisma/client';

export default class TodoService {
	async findAll(): Promise<Todo[]> {
		return await prisma.todo.findMany();
	}

	async findById(id: number): Promise<Todo | void> {
		return await entityIsExist(id, Entities.TODO);
	}

	async create(todo: Todo): Promise<Todo> {
		return await prisma.todo.create({ data: todo });
	}

	async updateById(id: number, data: Todo): Promise<Todo | void> {
		await entityIsExist(id, Entities.TODO);

		return await prisma.todo.update({
			where: { id },
			data,
		});
	}

	async deleteById(id: number): Promise<void> {
		await entityIsExist(id, Entities.TODO);
		await prisma.todo.delete({
			where: { id },
		});
	}

	async changeStatusById(
		id: number,
		status: Todo['status'],
	): Promise<Todo | void> {
		await entityIsExist(id, Entities.TODO);

		return await prisma.todo.update({
			where: { id },
			data: { status },
		});
	}
}
