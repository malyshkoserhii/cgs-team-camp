import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import TodosService from '~/services/todo.service';
import {
	CreateTodoType,
	GetAllTodoType,
	Todo,
	UpdateTodoType,
} from '~/utils/types';
import {
	FetchTodosError,
	AddTodoError,
	RemoveTodoError,
	UpdateTodoError,
} from '~/utils/errors';

const todosService = new TodosService();

interface TodoState {
	todo: Todo | null;
	todos: GetAllTodoType;
	loading: boolean;
	error: string | null;
	fetchTodos: () => Promise<void>;
	addTodo: (newTodo: CreateTodoType) => Promise<void>;
	removeTodo: (id: number) => Promise<void>;
	updateTodo: (id: number, updatedTodo: UpdateTodoType) => Promise<void>;
	getTodoById: (id: number) => Todo | undefined;
}

export const useTodoStore = create<TodoState>()(
	immer((set, get) => ({
		todo: null,
		todos: [],
		loading: false,
		error: null,

		fetchTodos: async (): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.fetchAllTodos();
				set({ todos: data });
			} catch (error) {
				if (error instanceof Error) {
					console.error('Failed to fetch todos', error);
					set({ error: new FetchTodosError(error.message).message });
				}
			} finally {
				set({ loading: false });
			}
		},

		addTodo: async (newTodo: CreateTodoType): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.createTodo(newTodo);
				set((state) => ({ todos: [...state.todos, data] }));
			} catch (error) {
				if (error instanceof Error) {
					console.error('Failed to add todo', error);
					set({ error: new AddTodoError(error.message).message });
				}
			} finally {
				set({ loading: false });
			}
		},

		removeTodo: async (id: number): Promise<void> => {
			set({ loading: true });
			try {
				await todosService.removeTodo(id);
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== id),
				}));
			} catch (error) {
				if (error instanceof Error) {
					console.error('Failed to remove todo', error);
					set({ error: new RemoveTodoError(error.message).message });
				}
			} finally {
				set({ loading: false });
			}
		},

		updateTodo: async (
			id: number,
			updatedTodo: UpdateTodoType,
		): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.updateTodo(id, updatedTodo);
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id ? data : todo,
					),
				}));
			} catch (error) {
				if (error instanceof Error) {
					console.error('Failed to update todo', error);
					set({ error: new UpdateTodoError(error.message).message });
				}
			} finally {
				set({ loading: false });
			}
		},

		getTodoById: (id: number): Todo | undefined => {
			return get().todos.find((todo) => todo.id === id);
		},
	})),
);
