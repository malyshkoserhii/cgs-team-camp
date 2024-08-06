import { AxiosError } from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AuthErrorMessages } from '~shared/enums/auth-messages.enum';
import {
	TodoErrorMessages,
	TodoMessages,
} from '~shared/enums/todo-messages.enum';
import {
	errorNotification,
	successNotification,
} from '~shared/services/notifications.service';
import TodosService from '~shared/services/todos.service';
import {
	CreateTodoType,
	GetAllTodoType,
	Todo,
	UpdateTodoType,
} from '~shared/types/todo.types';

const todosService = new TodosService();

interface TodoState {
	todo: Todo;
	todos: GetAllTodoType;
	loading: boolean;
	todoError: string | null;
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
		todoError: null,

		fetchTodos: async (): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.fetchAllTodos();
				set({
					todos: data,
					todoError: null,
				});
			} catch (error) {
				if (error instanceof AxiosError) {
					set({
						todoError: error.response?.data?.message,
					});
				} else {
					set({
						todoError: error.message,
					});
				}
				errorNotification(
					TodoErrorMessages.TODO_FETCH_FAIL(
						error.response.data.message || error.message,
					),
				);
			} finally {
				set({ loading: false });
			}
		},

		addTodo: async (newTodo): Promise<void> => {
			set({ loading: true });
			try {
				const { data } = await todosService.createTodo(newTodo);

				set((state) => ({
					todos: [...state.todos, data],
					todoError: null,
				}));
				successNotification(TodoMessages.TODO_CREATE_SUCCESS);
			} catch (error) {
				if (error instanceof AxiosError) {
					set({
						todoError: error.response?.data?.message,
					});
				} else {
					set({
						todoError: error.message,
					});
				}
				errorNotification(
					TodoErrorMessages.TODO_CREATE_FAIL(
						error.response.data.message || error.message,
					),
				);
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
					todoError: null,
				}));
			} catch (error) {
				if (error instanceof AxiosError) {
					set({
						todoError: error.response?.data?.message,
					});
				} else {
					set({
						todoError: error.message,
					});
				}
				errorNotification(
					TodoErrorMessages.TODO_DELETE_FAIL(
						error.response.data.message || error.message,
					),
				);
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
					todoError: null,
				}));

				successNotification(
					TodoMessages.TODO_UPDATE_SUCCESS(data.title),
				);
			} catch (error) {
				if (error instanceof AxiosError) {
					set({
						todoError: error.response?.data?.message,
					});
				} else {
					set({
						todoError: error.message,
					});
				}
				errorNotification(
					TodoErrorMessages.TODO_UPDATE_FAIL(
						error.response.data.message || error.message,
					),
				);
			} finally {
				set({ loading: false });
			}
		},
		getTodoById: async (id): Promise<void> => {
			try {
				const { data } = await todosService.getTodoById(id);
				set({ loading: false, todoError: null, todo: data });
			} catch (error) {
				if (error instanceof AxiosError) {
					set({
						todoError: error.response?.data?.message,
					});
				} else {
					set({
						todoError: error.message,
					});
				}
				errorNotification(
					AuthErrorMessages.GENERAL_ERROR_MESSAGE(
						error.response.data.message || error.message,
					),
				);
			}
		},
	})),
);
