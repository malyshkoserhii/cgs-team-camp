import { create } from 'zustand';
import { todoService } from '~shared/services/todo.service';
import { Todo } from '~shared/types/todo.type';
import { todoFilters } from '~shared/types/todoFilters.type';

interface TodoState {
	todos: Todo[];
	isLoading: boolean;
	error: string | null;
	fetchTodos: (filters?: Partial<todoFilters>) => Promise<void>;
	addTodo: (todo: Omit<Todo, 'id'>) => Promise<void>;
	updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
	deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
	todos: [],
	isLoading: false,
	error: null,
	fetchTodos: async (filters?: Partial<todoFilters>): Promise<void> => {
		set({ isLoading: true });
		try {
			const todos = await todoService.getTodos(filters);
			set({ todos, isLoading: false });
		} catch (error) {
			set({ error: 'Failed to fetch todos', isLoading: false });
		}
	},
	addTodo: async (todo: Omit<Todo, 'id'>): Promise<void> => {
		try {
			const newTodo = await todoService.addTodo(todo);
			set((state) => ({ todos: [...state.todos, newTodo] }));
		} catch (error) {
			set({ error: 'Failed to add todo' });
		}
	},
	updateTodo: async (id: number, updates: Partial<Todo>): Promise<void> => {
		try {
			const updatedTodo = await todoService.updateTodo(id, updates);
			set((state) => ({
				todos: state.todos.map((todo) =>
					todo.id === id ? updatedTodo : todo,
				),
			}));
		} catch (error) {
			set({ error: 'Failed to update todo' });
		}
	},
	deleteTodo: async (id: number): Promise<void> => {
		try {
			await todoService.deleteTodo(id);
			set((state) => ({
				todos: state.todos.filter((todo) => todo.id !== id),
			}));
		} catch (error) {
			set({ error: 'Failed to delete todo' });
		}
	},
}));
