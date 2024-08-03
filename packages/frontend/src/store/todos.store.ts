import { AxiosError } from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import TodosService from '~shared/services/todos.service';
import {
	CreateTodoType,
	GetAllTodoType,
	Todo,
	UpdateTodoType,
} from '~shared/types/Todo.types';

const todosService = new TodosService();

interface TodoState {
	todo: Todo;
	todos: GetAllTodoType;
	loading: boolean;
	error: AxiosError | null;
	fetchTodos: () => Promise<void>;
	addTodo: (newTodo: CreateTodoType) => Promise<void>;
	removeTodo: (id: number) => Promise<void>;
	updateTodo: (id: number, updatedTodo: UpdateTodoType) => Promise<void>;
	getTodoById: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>()(
	immer((set) => ({
		todo: null,

		todos: [],

		loading: false,
		error: null,

		fetchTodos: async (): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.fetchAllTodos();
				set({
					todos: data,
				});
			} catch (error) {
				console.error('Failed to fetch todos', error);
				set({ error: error.message });
			} finally {
				set({ loading: false });
			}
		},

		addTodo: async (newTodo): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.createTodo(newTodo);

				set((state) => ({ todos: [...state.todos, data] }));
			} catch (error) {
				console.error('Failed to add todo', error);
				set({ error: error.message });
			} finally {
				set({ loading: false });
			}
		},
		removeTodo: async (id): Promise<void> => {
			set({ loading: true });
			try {
				await todosService.removeTodo(id);
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== id),
				}));
			} catch (error) {
				console.error('Failed to remove todo', error);
				set({ error: error.message });
			} finally {
				set({ loading: false });
			}
		},

		updateTodo: async (id, updatedTodo): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.updateTodo(id, updatedTodo);
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id ? data : todo,
					),
				}));
			} catch (error) {
				console.error('Failed to update todo', error);
				set({ error: error.message });
			} finally {
				set({ loading: false });
			}
		},
		getTodoById: async (id): Promise<void> => {
			try {
				const { data } = await todosService.getTodoById(id);
				set({ loading: false });
				set({ todo: data });
			} catch (error) {
				set({ error: error.message });
			}
		},
	})),
);
