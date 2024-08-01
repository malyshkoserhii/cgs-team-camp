import { useCallback } from 'react';
import { Messages } from '~shared/const/messages.const';
import { useRequest, UseRequestReturn } from '~shared/hooks/useRequest';
import { TodoFormModel } from '~shared/models/todo.model';
import todoService from '~shared/services/http/todos.service';

export const useCreateTodo = (): UseRequestReturn<TodoFormModel> => {
	const request = useCallback(
		(todo: TodoFormModel) => todoService.create(todo),
		[],
	);
	return useRequest({
		request,
		initCall: false,
		message: Messages.CREATED_SUCCESSFULLY('Todo'),
	});
};
