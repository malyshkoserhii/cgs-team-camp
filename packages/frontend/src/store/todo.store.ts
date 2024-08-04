import { AxiosError } from 'axios';
import { create } from 'zustand';
import { ICreateTodo, ITodo } from '~shared/interfaces/todo.interface';
import TodoService from '~shared/services/todo.service';
import { immer } from 'zustand/middleware/immer';
import { enqueueSnackbar } from 'notistack';
import { ERROR_MESSAGES } from '~shared/constants/errorMessages';

interface ITodoStore {
	todo: ITodo;
	todos: ITodo[];
	loading: boolean;
	error: AxiosError | null;
	getAllTodo: () => Promise<void>;
	getTodoById: (id: string) => Promise<void>;
	createTodo: (body: ICreateTodo) => Promise<void>;
	updateTodo: (id: string, body: Partial<ICreateTodo>) => Promise<void>;
	deleteTodo: (id: string) => Promise<void>;
}

const todoService = new TodoService();

export const useTodoStore = create<ITodoStore>()(
	immer((set) => {
		return {
			todos: [],
			todo: null,
			loading: false,
			error: null,

			getAllTodo: async (): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await todoService.getAllTodos();

					set({
						todos: data.data,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.NOT_FOUND, {
						variant: 'error',
					});
					set({
						error: error.message,
						loading: false,
					});
				}
			},

			getTodoById: async (id: string): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await todoService.getTodoById(id);

					set({
						todo: data.data,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.NOT_FOUND, {
						variant: 'error',
					});
					set({
						error: error.message,
						loading: false,
					});
				}
			},

			createTodo: async (todo: ICreateTodo): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await todoService.createTodo(todo);

					set((state) => ({
						todos: [...state.todos, data.data],
						loading: false,
						error: null,
					}));
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});
					set({
						error: error.message,
						loading: false,
					});
				}
			},

			updateTodo: async (
				id: string,
				body: Partial<ICreateTodo>,
			): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await todoService.updateTodo(id, body);

					set((state) => ({
						todo: state.todos.map((todo) =>
							todo.id === data.data.id ? data.data : todo,
						),
						loading: false,
						error: null,
					}));
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, {
						variant: 'error',
					});
					set({
						error: error.message,
						loading: false,
					});
				}
			},

			deleteTodo: async (id: string): Promise<void> => {
				set({
					loading: true,
				});

				try {
					await todoService.deleteTodo(id);

					set((state) => ({
						todos: state.todos.filter(
							(todo) => todo.id !== Number(id),
						),
						loading: false,
						error: null,
					}));
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.NOT_FOUND, {
						variant: 'error',
					});
					set({
						error: error.message,
						loading: false,
					});
				}
			},
		};
	}),
);
