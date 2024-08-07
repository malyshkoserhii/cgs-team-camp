import { create } from 'zustand';
import {
	TodoCreateType,
	TodoType,
	TodoUpdateType,
} from '../typings/todos.type';

import {
	fetchDashboards,
	createDashboard,
	updateDashboard,
	deleteDashboard,
} from '../shared/services/dashboard.service';
import {
	DashboardCreateType,
	DashboardType,
	DashboardUpdateType,
} from '../typings/dashboard.type';
import {
	createTodo,
	deleteTodo,
	fetchTodos,
	updateTodo,
} from '../shared/services/todoIitem.service';

interface TodoState {
	todos: TodoType[];
	fetchTodos: () => void;
	addTodo: (todo: TodoCreateType) => void;
	updateTodo: (todo: TodoUpdateType) => void;
	removeTodo: (id: number) => void;
}

const useTodoStore = create<TodoState>((set) => ({
	todos: [],
	fetchTodos: async (): Promise<void> => {
		const todos = await fetchTodos();
		set({ todos });
	},
	addTodo: async (todo: TodoCreateType): Promise<void> => {
		const newTodo = await createTodo(todo);
		set((state) => ({ todos: [...state.todos, newTodo as TodoType] }));
	},
	updateTodo: async (todo: TodoUpdateType): Promise<void> => {
		const updatedTodo = await updateTodo(todo);
		set((state) => ({
			todos: state.todos.map((t) =>
				t.id === updatedTodo.id ? updatedTodo : t,
			),
		}));
	},
	removeTodo: async (id: number): Promise<void> => {
		await deleteTodo(id);
		set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
	},
}));

interface DashboardState {
	dashboards: DashboardType[];
	fetchDashboards: () => void;
	addDashboard: (dashboard: DashboardCreateType) => void;
	updateDashboard: (dashboard: DashboardUpdateType) => void;
	removeDashboard: (id: number) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
	dashboards: [],
	fetchDashboards: async (): Promise<void> => {
		const dashboards = await fetchDashboards();
		set({ dashboards });
	},
	addDashboard: async (dashboard: DashboardCreateType): Promise<void> => {
		const newDashboard = await createDashboard(dashboard);
		set((state) => ({ dashboards: [...state.dashboards, newDashboard] }));
	},
	updateDashboard: async (dashboard: DashboardUpdateType): Promise<void> => {
		const updatedDashboard = await updateDashboard(dashboard);
		set((state) => ({
			dashboards: state.dashboards.map((d) =>
				d.id === updatedDashboard.id ? updatedDashboard : d,
			),
		}));
	},
	removeDashboard: async (id: number): Promise<void> => {
		await deleteDashboard(id);
		set((state) => ({
			dashboards: state.dashboards.filter((d) => d.id !== id),
		}));
	},
}));

export { useTodoStore, useDashboardStore };
