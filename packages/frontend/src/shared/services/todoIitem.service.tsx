import {
	TodoCreateType,
	TodoType,
	TodoUpdateType,
} from '../../typings/todos.type';
import axios from 'axios';

export const fetchTodos = async (): Promise<TodoType[]> => {
	const response = await axios.get<TodoType[]>(
		'http://localhost:3030/api/todos',
	);
	return response.data;
};

export const createTodo = async (todo: TodoCreateType): Promise<TodoType> => {
	const response = await axios.post(
		'http://localhost:3030/api/todos/create',
		todo,
	);
	return response.data;
};

export const updateTodo = async (todo: TodoUpdateType): Promise<TodoType> => {
	const response = await axios.put(
		`http://localhost:3030/api/todos/update/${todo.id}`,
		todo,
	);
	return response.data;
};

export const deleteTodo = async (id: number): Promise<TodoType> => {
	const response = await axios.delete(
		`http://localhost:3030/api/todos/delete/${id}`,
		{
			method: 'DELETE',
		},
	);
	return response.data;
};
export const getTodoItemsByDashboard = async (
	dashboardId: number,
): Promise<TodoType[]> => {
	const response = await axios.get<TodoType[]>(
		`http://localhost:3030/api/todos?dashboard=${dashboardId}`,
	);
	return response.data;
};
