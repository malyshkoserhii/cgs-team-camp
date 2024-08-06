/* eslint-disable quotes */
import { create } from 'zustand';
import todoService from '~shared/components/todo/todo.service';
import TodoModel from '~shared/types/todo/todo.model';

export interface ITodoStore {
	data: { todos: TodoModel[]; pages: number };
	addTodo: (todo: TodoModel) => void;
	updateTodo: (todo: TodoModel) => void;
	deleteTodo: (todoId: number) => void;
	getTodos: () => void;
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

	getTodos: async (): Promise<void> => {
		const data = await todoService.getTodos();

		set(() => ({
			data: {
				...data,
			},
		}));
	},
}));
