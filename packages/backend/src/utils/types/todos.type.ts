import { TodoStatus } from '@prisma/client';

export type TodoFilterParams = {
	status: TodoStatus;
	name: string;
	isPrivate: string;
};
