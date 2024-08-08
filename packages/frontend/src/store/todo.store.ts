import { create } from 'zustand';
import { AxiosError } from 'axios';
import { immer } from 'zustand/middleware/immer';
import { toast } from 'react-toastify';

import { Todo } from '~typings/todo.types';
import { todosService } from '~/services/todos.service';

interface Pagination {
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

interface ITodoStore {
	todo: Todo | null;
	todos: Todo[];
	loading: boolean;
	error: AxiosError | null;
	getTodos: (
		search?: string,
		statusCompleted?: 'completed' | 'active',
		statusPrivate?: 'private' | 'public',
		page?: number,
		pageSize?: number,
	) => Promise<void>;
	createTodo: (todo: Todo) => Promise<void>;
	getTodoById: (id: string) => Promise<void>;
	updateTodo: (id: string, todo: Todo) => Promise<void>;
	deleteTodo: (id: string) => Promise<void>;
	patchTodoById: (id: string, updates: Partial<Todo>) => Promise<void>;
	pagination: Pagination | null;
}

export const useTodoStore = create<ITodoStore>()(
	immer((set) => ({
		todo: null,
		todos: [],
		loading: false,
		error: null,
		pagination: null,

		getTodos: async (
			search?: string,
			isCompleted?: 'completed' | 'active',
			isPrivate?: 'private' | 'public',
			page?: number,
			pageSize?: number,
		): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.getTodos(
					search,
					isCompleted,
					isPrivate,
					page,
					pageSize,
				);

				set({ todos: data.todos, pagination: data.pagination });
			} catch (err) {
				toast.error(err.response?.data?.message);
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
				toast.error(err.response?.data?.message);
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
				toast.error(err.response?.data?.message);
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
				toast.error(err.response?.data?.message);
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
				toast.error(err.response?.data?.message);
			} finally {
				set({ loading: false });
			}
		},

		patchTodoById: async (id, updates): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.patchTodoById(id, updates);
				set((state) => ({
					todos: state.todos.map((item) =>
						item.id === id ? { ...item, ...data } : item,
					),
				}));
				toast.success('Todo status updated successfully');
			} catch (err) {
				toast.error(err.response?.data?.message);
			} finally {
				set({ loading: false });
			}
		},
	})),
);
