import { AxiosError } from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { Messages } from '~shared/const/messages.const';
import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFormModel } from '~shared/models/todo.model';
import todoService from '~shared/services/http/todos.service';
import { notificationService } from '~shared/services/notificationService';
import { useUserStore } from './user.store';

interface TodoStore {
	items: TodoI[] | null;
	loading: boolean;
	editLoading: boolean;
	deleteIsLoading: boolean;
	createIsLoading: boolean;
	changeStatusIsLoading: boolean;
	error: AxiosError | null;
	fetchTodos: () => Promise<void>;
	fetchTodoById: (id: number) => Promise<void>;
	createTodo: (
		data: TodoFormModel,
		navigate: (route: string) => void,
	) => Promise<void>;
	updateTodoById: (id: number, data: TodoFormModel) => Promise<void>;
	changeStatusById: (id: string, status: TodoStatusE) => Promise<void>;
	deleteTodoById: (id: string) => Promise<void>;
}

const name = 'Todo';

export const useTodoStore = create<TodoStore>()(
	immer((set) => ({
		items: null,
		loading: false,
		deleteIsLoading: false,
		editLoading: false,
		createIsLoading: false,
		changeStatusIsLoading: false,
		error: null,
		fetchTodos: async (): Promise<void> => {
			set((state) => {
				state.loading = state.items ? false : true;
				state.error = null;
			});
			try {
				const response = await todoService.findAll();
				set((state) => {
					state.items = response.data;
					state.loading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.loading = false;
				});
			}
		},
		fetchTodoById: async (id: number): Promise<void> => {
			set((state) => {
				state.loading = true;
				state.error = null;
			});
			try {
				const response = await todoService.findById(id);
				set((state) => {
					state.items = [response.data];
					state.loading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.editLoading = false;
				});
			}
		},
		createTodo: async (data: TodoFormModel, navigate): Promise<void> => {
			set((state) => {
				state.createIsLoading = true;
				state.error = null;
			});
			try {
				await todoService.create(data);
				await useUserStore.getState().currentUser();
				notificationService.success(
					Messages.CREATED_SUCCESSFULLY(name),
				);
				navigate(ROUTER_KEYS.DASHBOARD);
				set((state) => {
					state.createIsLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.createIsLoading = false;
				});
			}
		},
		updateTodoById: async (
			id: number,
			data: TodoFormModel,
		): Promise<void> => {
			set((state) => {
				state.editLoading = true;
				state.error = null;
			});
			try {
				await todoService.updateById(id.toString(), data);
				notificationService.success(
					Messages.UPDATED_SUCCESSFULLY(name),
				);
				set((state) => {
					state.editLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.editLoading = false;
				});
			}
		},
		changeStatusById: async (
			id: string,
			status: TodoStatusE,
		): Promise<void> => {
			set((state) => {
				state.changeStatusIsLoading = true;
				state.error = null;
			});
			try {
				await todoService.changeStatusById(id, status);
				set((state) => {
					state.changeStatusIsLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.changeStatusIsLoading = false;
				});
			}
		},
		deleteTodoById: async (id: string): Promise<void> => {
			set((state) => {
				state.deleteIsLoading = true;
				state.error = null;
			});
			try {
				await todoService.deleteById(id);
				notificationService.success(
					Messages.DELETED_SUCCESSFULLY(name),
				);
				set((state) => {
					state.deleteIsLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.deleteIsLoading = false;
				});
			}
		},
	})),
);
