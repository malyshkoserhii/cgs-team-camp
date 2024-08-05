import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { TodoService } from '~/services/todo.service';
import { todoKeys } from '../queryKeys';
import { showToast } from '~/utils/showToast';

import type { Todo } from '~typings/todo';

const todoService = new TodoService();

export const useGetAllTodos = () => {
	return useQuery({
		queryKey: todoKeys.todos,
		queryFn: () => todoService.getAllTodos(),
	});
};

export const useGetTodoById = (id: string) => {
	return useQuery({
		queryKey: todoKeys.todoById(id),
		queryFn: () => todoService.getTodoById(id),
	});
};

export const useCreateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newTodo: Omit<Todo, 'id'>) =>
			todoService.createTodo(newTodo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: todoKeys.todos });
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
			queryClient.invalidateQueries({ queryKey: todoKeys.todoById(id) });
			queryClient.invalidateQueries({ queryKey: todoKeys.todos });
			showToast('Todo updated successfully!');
		},
	});
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => todoService.deleteTodo(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: todoKeys.todos });
			showToast('Todo deleted successfully!');
		},
	});
};
