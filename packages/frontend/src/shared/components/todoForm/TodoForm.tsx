import { Button } from '@blueprintjs/core';
import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { ICreateTodo } from '~shared/interfaces/todo.interface';

interface ITodoForm {
	title: string;
	onSubmit: (data: ICreateTodo) => void;
	handleSubmit: UseFormHandleSubmit<ICreateTodo, undefined>;
	children: React.ReactNode;
}

const TodoForm = ({
	title,
	onSubmit,
	handleSubmit,
	children,
}: ITodoForm): React.ReactNode => {
	return (
		<div>
			<h2>{title}</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				{children}

				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};

export default TodoForm;
