import { create } from 'zustand';
import { AxiosError } from 'axios';

import { Todo } from '~typings/todo.types';
import { TodosService } from '~/services/todos.service';
import { immer } from 'zustand/middleware/immer';
import { toast } from 'react-toastify';

const todosService = new TodosService();

interface ITodoStore {
	todo: Todo;
	todos: Todo[];
	loading: boolean;
	error: AxiosError | null;
	getTodos: () => Promise<void>;
	createTodo: (todo: Todo) => Promise<void>;
	getTodoById: (id: string) => Promise<void>;
	updateTodo: (id: string, todo: Todo) => Promise<void>;
	deleteTodo: (id: string) => Promise<void>;
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
				const { data } = await todosService.getTodos();
				set({ todos: data });
			} catch (err) {
				// set({ error: err.message });
				toast.error(err.response.data.message);
			} finally {
				set({ loading: false });
			}
		},

		createTodo: async (todo): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.createTodo(todo);
				set((state) => ({ todos: [...state.todos, data] }));
				toast.success('Todo created successfully');
			} catch (err) {
				// set({ error: err.message });
				toast.error(err.response.data.message);
			} finally {
				set({ loading: false });
			}
		},

		getTodoById: async (id): Promise<void> => {
			set({ loading: true });
			const { data } = await todosService.getTodoById(id);
			set({ todo: data });
			try {
			} catch (err) {
				// set({ error: err.message });
				toast.error(err.response.data.message);
			} finally {
				set({ loading: false });
			}
		},

		updateTodo: async (id, todo): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.updateTodo(id, todo);
				set((state) => ({
					todos: state.todos.map((item) =>
						item.id === id ? data : item,
					),
				}));
				toast.success('Todo updated successfully');
			} catch (err) {
				// set({ error: err });
				toast.error(err.response.data.message);
			} finally {
				set({ loading: false });
			}
		},

		deleteTodo: async (id): Promise<void> => {
			set({ loading: true });
			try {
				await todosService.deleteTodo(id);
				set((state) => ({
					todos: state.todos.filter((item) => item.id !== id),
				}));
				toast.success('Todo deleted successfully');
			} catch (err) {
				// set({ error: err.message });
				toast.error(err.response.data.message);
			} finally {
				set({ loading: false });
			}
		},
	})),
);
