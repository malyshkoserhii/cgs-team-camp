import { AxiosError } from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { Messages } from '~shared/const/messages.const';
import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFormModel } from '~shared/models/todo.model';
import { TodoFilterModel } from '~shared/models/todoFilter.model';
import todoService from '~shared/services/http/todos.service';
import { notificationService } from '~shared/services/notificationService';
import useModalStore from './modal.store';
import { useUserStore } from './user.store';

export type TodoStatusCounter = {
	completedCount: number;
	inProgressCount: number;
};

interface TodoStore {
	items: TodoI[] | null;
	totalResults: number;
	loading: boolean;
	editLoading: boolean;
	totalPages: number;
	showMoreIsLoading: boolean;
	deleteIsLoading: boolean;
	createIsLoading: boolean;
	changeStatusIsLoading: boolean;
	hasMore: boolean;
	error: AxiosError | null;
	statusCounter: TodoStatusCounter;
	fetchTodos: (params?: TodoFilterModel) => Promise<void>;
	showMoreTodos: (params?: TodoFilterModel) => Promise<void>;
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
		totalPages: 0,
		totalResults: 0,
		statusCounter: { completedCount: 0, inProgressCount: 0 },
		editLoading: false,
		showMoreIsLoading: false,
		createIsLoading: false,
		changeStatusIsLoading: false,
		hasMore: true,
		error: null,
		fetchTodos: async (params): Promise<void> => {
			set((state) => {
				state.loading = state.items ? false : true;
				state.error = null;
			});
			try {
				const response = await todoService.findAll(params);
				set((state) => {
					state.items = response.data.todos;
					state.totalPages = response.data.totalPages;
					state.loading = false;
					state.totalResults = response.data.totalResults;
					state.statusCounter = response.data.statusCounter;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.loading = false;
				});
			}
		},
		showMoreTodos: async (params): Promise<void> => {
			set((state) => {
				state.showMoreIsLoading = true;
				state.error = null;
			});
			try {
				const response = await todoService.findAll(params);
				set((state) => {
					state.items = response.data.todos;
					state.totalPages = response.data.totalPages;
					state.showMoreIsLoading = false;
					state.hasMore = response.data.hasMore;
					state.totalResults = response.data.totalResults;
					state.statusCounter = response.data.statusCounter;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.showMoreIsLoading = false;
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
				const response = await todoService.updateById(
					id.toString(),
					data,
				);
				useModalStore.getState().closeModal();
				notificationService.success(
					Messages.UPDATED_SUCCESSFULLY(name),
				);

				set((state) => {
					state.items = state.items.map((item) =>
						item.id === Number(id) ? response.data : item,
					);
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
				const response = await todoService.changeStatusById(id, status);
				set((state) => {
					state.items = state.items.map((item) =>
						item.id === Number(id) ? response.data : item,
					);
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
					state.items = state.items.filter(
						(item) => item.id !== Number(id),
					);
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
