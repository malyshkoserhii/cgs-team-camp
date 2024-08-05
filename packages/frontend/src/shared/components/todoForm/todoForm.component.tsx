import { Button, Card, Elevation } from '@blueprintjs/core';
import React from 'react';
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form';
import { ICreateTodo } from '~shared/interfaces/todo.interface';
import { formBox } from './todoForm.styles';
import Input from '../input/input.component';
import Textarea from '../textarea/textarea.component';

interface ITodoForm {
	title: string;
	onSubmit: (data: ICreateTodo) => void;
	handleSubmit: UseFormHandleSubmit<ICreateTodo, undefined>;
	children?: React.ReactNode;
	defaultValue?: ICreateTodo;
	register: UseFormRegister<ICreateTodo>;
	errors: FieldErrors<ICreateTodo>;
}

const TodoForm = ({
	title,
	onSubmit,
	handleSubmit,
	defaultValue,
	register,
	children,
	errors,
}: ITodoForm): React.ReactNode => {
	return (
		<Card elevation={Elevation.THREE}>
			<h2 style={{ marginBottom: '30px' }}>{title}</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={formBox}>
				<Input
					label="Title"
					defaultValue={defaultValue?.title}
					{...register('title')}
					errorMessage={errors.title?.message}
				/>
				<Textarea
					label="Description"
					defaultValue={defaultValue?.description}
					{...register('description')}
					errorMessage={errors.description?.message}
				/>
				<Input
					label="Public"
					type="checkbox"
					defaultChecked={defaultValue?.public}
					{...register('public')}
				/>
				<Input
					label="Completed"
					type="checkbox"
					defaultChecked={defaultValue?.completed}
					{...register('completed')}
				/>
				{children}

				<Button type="submit">Submit</Button>
			</form>
		</Card>
	);
};

export default TodoForm;
