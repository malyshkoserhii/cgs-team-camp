import { AxiosError } from 'axios';
import { create } from 'zustand';
import { ICreateTodo, ITodo } from '~shared/interfaces/todo.interface';
import TodoService from '~shared/services/todo.service';
import { immer } from 'zustand/middleware/immer';

interface ITodoStore {
	todo: ITodo;
	todos: ITodo[];
	loading: boolean;
	error: AxiosError | null;
	getAllTodo: () => Promise<void>;
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
					});
				} catch (error) {
					// macke up somthing better for errors
					console.error('Fieled to featch data', error);
					set({
						error: error.message,
						loading: false,
					});
				}
			},

			getTodoById: async (): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await todoService.getTodoById();

					set({
						todo: data.data,
					});
				} catch (error) {
					// macke up somthing better for errors
					console.error('Fieled to featch data', error);
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

					set({
						todo: data.data,
						loading: false,
					});
				} catch (error) {
					// macke up somthing better for errors
					console.error('Fieled to featch data', error);
					set({
						error: error.message,
						loading: false,
					});
				}
			},
		};
	}),
);
