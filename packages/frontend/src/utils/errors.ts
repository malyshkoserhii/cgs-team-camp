export class TodoError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TodoError';
	}
}

export class FetchTodosError extends TodoError {
	constructor(message: string) {
		super(message);
		this.name = 'FetchTodosError';
	}
}

export class AddTodoError extends TodoError {
	constructor(message: string) {
		super(message);
		this.name = 'AddTodoError';
	}
}

export class RemoveTodoError extends TodoError {
	constructor(message: string) {
		super(message);
		this.name = 'RemoveTodoError';
	}
}

export class UpdateTodoError extends TodoError {
	constructor(message: string) {
		super(message);
		this.name = 'UpdateTodoError';
	}
}

export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ValidationError';
	}
}
