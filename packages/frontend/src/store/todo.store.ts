import { AxiosError } from "axios";
import { create } from "zustand";
import { ITodo, ITodoCreate } from "~/types/todo.type";
import { immer } from 'zustand/middleware/immer';
import todoService from "~shared/services/todo/todo";

interface ITodoStore {
    items: ITodo[] | null, 
    error: AxiosError | null,
    fetchTodos: () => Promise<void>, 
    fetchOneTodo: (id: number) => Promise<void>,
    createTodo: (data: ITodoCreate) => Promise<void>,
    updateTodo: (id: number, data: ITodoCreate) => Promise<void>,
    deleteTodo: (id: number) => Promise<void>,
}

export const useTodoStore = create<ITodoStore>()(
    immer((set) => ({
        items: null,
        error: null,
        fetchTodos: async (): Promise<void> => {
            set((state) => {
                state.error = null;
            });
            try {
                const response = await todoService.getAllTodos();
                set((state) => {
                    state.items = response.data;
                });
            } catch (error) {
                set((state) => {
                    state.error = error as AxiosError;
                });
            }
        },
        fetchOneTodo: async (id: number): Promise<void> => {
            set((state) => {
                state.error = null;
            });
            try {
                const response = await todoService.getOneTodo(id);
                set((state) => {
                    state.items = [response.data];
                });
            } catch (error) {
                set((state) => {
                    state.error = error as AxiosError;
                });
            }
        },
        createTodo: async (data: ITodoCreate): Promise<void> => {
            set((state) => {
                state.error = null;
            });
            try {
                await todoService.createTodo(data);
                set((state) => {
                    state.items?.push(data as ITodo);
                });
            } catch (error) {
                set((state) => {
                    state.error = error as AxiosError;
                });
            }
        },
        updateTodo: async (id: number, data: ITodo): Promise<void> => {
            set((state) => {
                state.error = null;
            });
            try {
                await todoService.editTodo(data);
                set((state) => {
                    const index = state.items?.findIndex(todo => todo.id === id);
                    if (index !== undefined && index !== -1 && state.items) {
                        state.items[index] = { ...state.items[index], ...data };
                    }
                });
            } catch (error) {
                set((state) => {
                    state.error = error as AxiosError;
                });
            }
        },
        deleteTodo: async (id: number): Promise<void> => { 
            set((state) => {
                state.error = null;
            });
            try {
                await todoService.deleteTodo(id);
                set((state) => {
                    state.items = state.items?.filter(todo => todo.id !== id) || null;
                });
            } catch (error) {
                set((state) => {
                    state.error = error as AxiosError;
                });
            }
        },
    }))
);
