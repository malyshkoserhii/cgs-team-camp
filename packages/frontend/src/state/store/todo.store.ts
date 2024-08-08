import { isMobile } from 'react-device-detect';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

export const useTodoStore = create(
	persist<ITodoStore>(
		(set) => ({
			data: { todos: [], pages: 1 },

			addTodo: (todo): void =>
				set((state) => ({
					data: {
						...state.data,
						todos: [...state.data.todos, todo],
					},
				})),

			updateTodo: (todo): void =>
				set((state) => ({
					data: {
						...state.data,
						todos: state.data.todos.map((t) =>
							t.id === todo.id ? todo : t,
						),
					},
				})),

			deleteTodo: (todoId): void =>
				set((state) => ({
					data: {
						...state.data,
						todos: state.data.todos.filter((t) => t.id !== todoId),
					},
				})),

			getTodos: async (filter: TodoFilters): Promise<IGetTodo> => {
				const response = await todoService.getTodos(filter);

				set((state) => ({
					data: {
						todos:
							(isMobile && filter.page === 1) || !isMobile
								? response.todos
								: [...state.data.todos, ...response.todos],
						pages: response.pages,
					},
				}));

				return response;
			},
		}),
		{
			name: 'todo-store',
			partialize: (state) => state,
		},
	),
);
