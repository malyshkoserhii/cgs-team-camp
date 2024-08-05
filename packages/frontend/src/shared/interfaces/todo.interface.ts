export interface BaseResponse<T extends ITodo | ITodo[]> {
	code: number;
	data: T;
}

export interface ITodo {
	id: number;
	title: string;
	description: string;
	public: boolean;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICreateTodo {
	title?: string;
	description?: string;
	public?: boolean;
	completed?: boolean;
}
