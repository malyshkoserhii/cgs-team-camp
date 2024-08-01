import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { TodoI } from '~shared/interfaces/todo.interface';
import { todoSchemaResolver } from '~shared/joiSchemas/joiSchemas/todo/todo.schema';
import { TodoFormModel } from '~shared/models/todo.model';
import { Form } from '~shared/ui/form';
import { FormVariant } from '~shared/ui/form/ui/Form';
import { useTodoStore } from '~store/todos.store';
import { options } from '../model/formOptions';

type Props = {
	isEdit?: boolean;
	variant?: FormVariant;
	todo?: TodoI;
};

export const TodoForm = ({
	isEdit,
	variant = 'default',
	todo,
}: Props): ReactElement => {
	const {
		fetchTodos,
		updateTodoById,
		createIsLoading,
		editLoading,
		createTodo,
	} = useTodoStore();
	const navigate = useNavigate();

	const onSubmit = async (data: TodoFormModel): Promise<void> => {
		data.isPrivate = JSON.parse(data.isPrivate);
		if (isEdit) {
			await updateTodoById(todo.id, data);
			await fetchTodos();
		} else {
			try {
				await createTodo(data);
				navigate(ROUTER_KEYS.DASHBOARD);
			} catch {}
		}
	};

	return (
		<Form<TodoFormModel>
			variant={variant}
			heading={isEdit ? 'Edit todo' : 'Create todo'}
			options={options}
			defaultValues={new TodoFormModel(todo)}
			formValidationSchema={todoSchemaResolver}
			onSubmit={onSubmit}
			isLoading={createIsLoading || editLoading}
		/>
	);
};
