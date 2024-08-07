export enum TodoStatus {
	InProgress = 'InProgress',
	Completed = 'Completed',
}

export type Todo = {
	id: string;
	name: string;
	description?: string | null;
	status: TodoStatus;
	isPrivate: boolean;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
};

export type CreateTodoInput = Omit<
	Todo,
	'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

export type UpdateTodoInput = Partial<CreateTodoInput>;

export type CreateUserInput = {
	email: string;
	password: string;
	name?: string;
};
