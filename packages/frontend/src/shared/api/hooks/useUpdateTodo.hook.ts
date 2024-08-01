import { useCallback } from 'react';
import { Messages } from '~shared/const/messages.const';
import { useRequest, UseRequestReturn } from '~shared/hooks/useRequest';
import { TodoFormModel } from '~shared/models/todo.model';
import todoService from '~shared/services/http/todos.service';

export const useUpdateTodo = (id: string): UseRequestReturn<TodoFormModel> => {
	const request = useCallback(
		(todo: TodoFormModel) => todoService.updateById(id, todo),
		[],
	);
	return useRequest({
		request,
		initCall: false,
		message: Messages.UPDATED_SUCCESSFULLY('Todo'),
	});
};
