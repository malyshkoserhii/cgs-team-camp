import { ReactElement } from 'react';
import { useCreateTodo } from '~shared/api/hooks/useCreateTodo.hook';
import { useUpdateTodo } from '~shared/api/hooks/useUpdateTodo.hook';
import { TodoI } from '~shared/interfaces/todo.interface';
import { todoSchemaResolver } from '~shared/joiSchemas/joiSchemas/todo/todo.schema';
import { TodoFormModel } from '~shared/models/todo.model';
import { Form } from '~shared/ui/form';
import { FormVariant } from '~shared/ui/form/ui/Form';
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
	const { loading, fetch } = useCreateTodo();
	const { loading: editIsLoading, fetch: fetchEdit } = useUpdateTodo(
		String(todo?.id),
	);

	const onSubmit = (data: TodoFormModel): void => {
		data.isPrivate = JSON.parse(data.isPrivate);
		if (isEdit) {
			fetchEdit(data);
		} else {
			fetch(data);
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
			isLoading={loading || editIsLoading}
		/>
	);
};
