import { isMobile } from 'react-device-detect';
import { create } from 'zustand';
import todoService from '~shared/components/todo/todo.service';
import TodoModel from '~shared/types/todo/todo.model';
import { TodoFilters } from '~shared/types/todo/todo.types';

export interface IGetTodo {
	todos: TodoModel[];
	pages: number;
}

export interface ITodoStore {
	data: IGetTodo;
	addTodo: (todo: TodoModel) => void;
	updateTodo: (todo: TodoModel) => void;
	deleteTodo: (todoId: number) => void;
	getTodos: (filter: TodoFilters) => Promise<IGetTodo>;
}

export const useTodoStore = create<ITodoStore>((set) => ({
	data: { todos: [], pages: 1 },

	addTodo: (todo): void =>
		set(({ data }) => ({
			data: {
				...data,
				todos: [...data.todos, todo],
			},
		})),

	updateTodo: (todo): void =>
		set(({ data }) => ({
			data: {
				...data,
				todos: data.todos.map((t) => (t.id === todo.id ? todo : t)),
			},
		})),

	deleteTodo: (todoId): void =>
		set(({ data }) => ({
			data: {
				...data,
				todos: data.todos.filter((t) => t.id !== todoId),
			},
		})),

	getTodos: async (filter: TodoFilters): Promise<IGetTodo> => {
		const response = await todoService.getTodos(filter);

		set(({ data }) => {
			return {
				data: {
					todos:
						isMobile && filter.page === 1
							? response.todos
							: [...data.todos, ...response.todos],
					pages: response.pages,
				},
			};
		});

		return response;
	},
}));
