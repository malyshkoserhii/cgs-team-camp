import {
	TodoCreateType,
	TodoType,
	TodoUpdateType,
} from '../../typings/todos.type';

export const fetchTodos = async (): Promise<TodoType[]> => {
	const response = await fetch('http://localhost:3030/api/todos');
	return response.json();
};

export const createTodo = async (todo: TodoCreateType): Promise<TodoType> => {
	const response = await fetch('http://localhost:3030/api/todos/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(todo),
	});
	return response.json();
};

export const updateTodo = async (todo: TodoUpdateType): Promise<TodoType> => {
	const response = await fetch(
		`http://localhost:3030/api/todos/update/${todo.id}`,
		{
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(todo),
		},
	);
	return response.json();
};

export const deleteTodo = async (id: number): Promise<TodoType> => {
	const response = await fetch(
		`http://localhost:3030/api/todos/delete/${id}`,
		{
			method: 'DELETE',
		},
	);
	return response.json();
};
