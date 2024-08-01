import { useCallback } from 'react';
import { useRequest, UseRequestReturn } from '~shared/hooks/useRequest';
import { TodoI } from '~shared/interfaces/todo.interface';
import todoService from '~shared/services/http/todos.service';

export const useGetTodos = (): UseRequestReturn<TodoI[]> => {
	const request = useCallback(() => todoService.findAll(), []);
	return useRequest({
		request,
		initCall: true,
	});
};
