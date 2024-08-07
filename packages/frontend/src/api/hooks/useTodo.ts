import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { TodoService } from '~/services/todo.service';
import { QUERY_KEYS } from '../queryKeys';
import { showToast } from '~/utils/showToast';

import type { Todo } from '~typings/todo';
import type { FilterQueryParams } from '~typings/api';

const todoService = new TodoService();

export const useGetAllTodos = (filters: FilterQueryParams) => {
	return useQuery({
		queryKey: QUERY_KEYS.todos,
		queryFn: () => todoService.getAllTodos(),
	});
};

export const useGetTodoById = (id: string) => {
	return useQuery({
		queryKey: QUERY_KEYS.todoById(id),
		queryFn: () => todoService.getTodoById(id),
	});
};

export const useCreateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newTodo: Omit<Todo, 'id'>) =>
			todoService.createTodo(newTodo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
			showToast('Todo added successfully!');
		},
	});
};

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (updatedTodo: { id: string; data: Partial<Todo> }) =>
			todoService.updateTodo(updatedTodo.id, updatedTodo.data),
		onSuccess: ({ id }) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.todoById(id),
			});
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
			showToast('Todo updated successfully!');
		},
	});
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => todoService.deleteTodo(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
			showToast('Todo deleted successfully!');
		},
	});
};
