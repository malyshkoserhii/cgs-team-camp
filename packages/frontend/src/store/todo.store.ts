import { create } from 'zustand';
import { AxiosError } from 'axios';

import { Todo } from '~typings/todo.types';
import { immer } from 'zustand/middleware/immer';
import { TodosService } from '~/services/todos.service';

const { getTodos, createTodo, getTodoById, updateTodo, deleteTodo } =
	new TodosService();

interface ITodoStore {
	todo: Todo;
	todos: Todo[];
	loading: boolean;
	error: AxiosError | null;
	getTodos: () => Promise<void>;
	createTodo: (todo: Todo) => Promise<void>;
	getTodoById: (id: string) => Promise<void>;
	updateTodo: (id: string, todo: Todo) => Promise<void>;
	deleteTodo: (id: string, todo: Todo) => Promise<void>;
}

export const useTodoStore = create<ITodoStore>()(
	immer((set) => ({
		todo: null,
		todos: [],
		loading: false,
		error: null,

		getTodos: async (): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await getTodos();
				set({ todos: data });
			} catch (err) {
				console.error('Failed to get todos', err);
				set({ error: err.message });
			} finally {
				set({ loading: false });
			}
		},

		createTodo: async (todo): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await createTodo(todo);
				set((state) => ({ todos: [...state.todos, data] }));
			} catch (err) {
				console.error('Failed to create todo', err);
				set({ error: err.message });
			} finally {
				set({ loading: false });
			}
		},

		getTodoById: async (id): Promise<void> => {
			set({ loading: true });
			const { data } = await getTodoById(id);
			set({ todo: data });
			try {
			} catch (err) {
				console.error('Failed to get todo by id', err);
				set({ error: err.message });
			} finally {
				set({ loading: false });
			}
		},

		updateTodo: async (id, todo): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await updateTodo(id, todo);
				set((state) => ({
					todos: state.todos.map((item: { id: string }) =>
						item.id === id ? data : item,
					),
				}));
			} catch (err) {
				console.error('Failed to create todo', err);
				set({ error: err.message });
			} finally {
				set({ loading: false });
			}
		},

		deleteTodo: async (id): Promise<void> => {
			set({ loading: true });
			try {
				await deleteTodo(id);
				set((state) => ({
					todos: state.todos.filter(
						(item: { id: string }) => item.id !== id,
					),
				}));
			} catch (err) {
				console.error('Failed to create todo', err);
				set({ error: err.message });
			} finally {
				set({ loading: false });
			}
		},
	})),
);
