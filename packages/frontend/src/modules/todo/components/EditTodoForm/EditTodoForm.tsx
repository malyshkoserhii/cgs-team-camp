import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';
import Button from '~shared/components/button/button.component';

const formStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spacing.medium};
`;

interface EditTodoFormProps {
	initialValues: TodoFormValues;
	onSubmit: (data: TodoFormValues) => void;
}

interface TodoFormValues {
	title: string;
	description: string;
	completed: boolean;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({
	initialValues,
	onSubmit,
}) => {
	const { register, handleSubmit, reset } = useForm<TodoFormValues>({
		defaultValues: initialValues,
	});

	const onSubmitForm: SubmitHandler<TodoFormValues> = (data) => {
		onSubmit(data);
	};

	React.useEffect(() => {
		reset(initialValues);
	}, [initialValues, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmitForm)} className={formStyles}>
			<div>
				<label>Title</label>
				<input
					{...register('title')}
					type="text"
					placeholder="Todo Title"
				/>
			</div>
			<div>
				<label>Description</label>
				<textarea
					{...register('description')}
					placeholder="Todo Description"
				/>
			</div>
			<div>
				<label>
					<input type="checkbox" {...register('completed')} />
					Completed
				</label>
			</div>
			<Button text="Save Changes" type="submit" />
		</form>
	);
};

export default EditTodoForm;
