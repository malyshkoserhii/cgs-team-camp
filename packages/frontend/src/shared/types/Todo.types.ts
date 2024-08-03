export type Todo = {
	id: number;
	title: string;
	description: string;
	isCompleted: boolean;
	isPrivate: boolean;
};

export type CreateTodoType = Omit<Todo, 'id'>;
export type UpdateTodoType = Partial<Todo>;

export type GetAllTodoType = Todo[];
