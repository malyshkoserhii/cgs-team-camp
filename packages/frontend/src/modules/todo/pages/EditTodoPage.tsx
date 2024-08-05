import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTodoStore } from '~store/todoStore';
import { UpdateTodoType } from '~/utils/types';
import { formContainerStyles, buttonContainerStyles } from './TodoPage.styles';
import Button from '~shared/components/button/button.component';
import Input from './Input';
import Textarea from './Textarea';
import Checkbox from './Checkbox';

interface EditTodoFormValues {
	title: string;
	description: string;
	completed: boolean;
}

const EditTodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getTodoById, updateTodo } = useTodoStore();
	const [todo, setTodo] = useState<EditTodoFormValues | undefined>(() =>
		getTodoById(Number(id)),
	);

	useEffect(() => {
		setTodo(getTodoById(Number(id)));
	}, [id, getTodoById]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EditTodoFormValues>({
		defaultValues: {
			title: todo?.title || '',
			description: todo?.description || '',
			completed: todo?.completed || false,
		},
	});

	useEffect(() => {
		reset({
			title: todo?.title || '',
			description: todo?.description || '',
			completed: todo?.completed || false,
		});
	}, [todo, reset]);

	const onSubmit: SubmitHandler<EditTodoFormValues> = async (data) => {
		if (todo) {
			await updateTodo(Number(id), data as UpdateTodoType);
			navigate('/');
		}
	};

	if (!todo) {
		return <div>Todo not found</div>;
	}

	const handleBackClick = (): void => {
		navigate(-1);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={formContainerStyles}>
			<Input<EditTodoFormValues>
				id="title"
				label="Title"
				register={register}
				errors={errors.title}
				required
			/>
			<Textarea<EditTodoFormValues>
				id="description"
				label="Description"
				register={register}
				errors={errors.description}
			/>
			<Checkbox<EditTodoFormValues>
				id="completed"
				label="Completed"
				register={register}
			/>
			<div className={buttonContainerStyles}>
				<Button type="submit" text="Save" />
				<Button text="Back" onClick={handleBackClick} />
			</div>
		</form>
	);
};

export default EditTodoPage;
