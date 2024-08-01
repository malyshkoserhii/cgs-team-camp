import { AxiosError } from 'axios';
import { create } from 'zustand';
import { Messages } from '~shared/const/messages.const';
import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { TodoI } from '~shared/interfaces/todo.interface';
import { TodoFormModel } from '~shared/models/todo.model';
import todoService from '~shared/services/http/todos.service';
import { notificationService } from '~shared/services/notificationService';

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
	createTodo: (data: TodoFormModel) => Promise<void>;
	updateTodoById: (id: number, data: TodoFormModel) => Promise<void>;
	changeStatusById: (id: string, status: TodoStatusE) => Promise<void>;
	deleteTodoById: (id: string) => Promise<void>;
}

const name = 'Todo';

export const useTodoStore = create<TodoStore>((set) => ({
	items: null,
	loading: false,
	deleteIsLoading: false,
	editLoading: false,
	createIsLoading: false,
	changeStatusIsLoading: false,
	error: null,
	fetchTodos: async (): Promise<void> => {
		set((state) => ({ loading: state.items ? false : true, error: null }));
		try {
			const response = await todoService.findAll();
			set({ items: response.data, loading: false });
		} catch (error) {
			set({ error: error as AxiosError, loading: false });
		}
	},
	fetchTodoById: async (id: number): Promise<void> => {
		set({ loading: true, error: null });
		try {
			const response = await todoService.findById(id);
			set({ items: [response.data], loading: false });
		} catch (error) {
			set({ error: error as AxiosError, editLoading: false });
		}
	},
	createTodo: async (data: TodoFormModel): Promise<void> => {
		set({ createIsLoading: true, error: null });
		try {
			await todoService.create(data);
			notificationService.success(Messages.CREATED_SUCCESSFULLY(name));
			set({ createIsLoading: false });
		} catch (error) {
			set({ error: error as AxiosError, createIsLoading: false });
		}
	},
	updateTodoById: async (id: number, data: TodoFormModel): Promise<void> => {
		set({ editLoading: true, error: null });
		try {
			await todoService.updateById(id.toString(), data);
			notificationService.success(Messages.UPDATED_SUCCESSFULLY(name));
			set({ editLoading: false });
		} catch (error) {
			set({ error: error as AxiosError, editLoading: false });
		}
	},
	changeStatusById: async (
		id: string,
		status: TodoStatusE,
	): Promise<void> => {
		set({ changeStatusIsLoading: true, error: null });
		try {
			await todoService.changeStatusById(id, status);
			set({ changeStatusIsLoading: false });
		} catch (error) {
			set({ error: error as AxiosError, changeStatusIsLoading: false });
		}
	},
	deleteTodoById: async (id: string): Promise<void> => {
		set({ deleteIsLoading: true, error: null });
		try {
			await todoService.deleteById(id);
			notificationService.success(Messages.DELETED_SUCCESSFULLY(name));
			set({ deleteIsLoading: false });
		} catch (error) {
			set({ error: error as AxiosError, deleteIsLoading: false });
		}
	},
}));
