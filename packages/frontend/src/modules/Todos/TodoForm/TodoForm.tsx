import React, { useMemo } from 'react';

import { Schema } from 'joi';
import { Input } from '~shared/components/input/input.component';
import { Textarea } from '~shared/components/textarea/textarea.component';

import { CustomCheckBox } from '~shared/components/checkbox/checkbox';
import { UtilForm } from '~shared/components/form/form';

import { CustomToggle } from '~shared/components/toggle/toggle.component';
import { TodoFormInitState } from '~shared/constants/form-initial-values/todo-form-init-values';
import { Todo } from '~shared/types/todo.types';
import { CheckBoxContainer } from './Form.styles';

type AddTodoProps = {
	onSubmit(todo: Todo): void;

	schema: Schema;
	SubmitButtonText?: string;
	todo?: Todo;
};

export function AddTodoForm({
	onSubmit,

	schema,
	SubmitButtonText = 'Create Todo',
	todo,
}: AddTodoProps): JSX.Element {
	const initState = useMemo(() => {
		return todo
			? {
					title: todo.title,
					description: todo.description,
					isCompleted: todo.isCompleted,
					isPrivate: todo.isPrivate,
				}
			: TodoFormInitState;
	}, [todo]);

	return (
		<UtilForm
			onSubmit={onSubmit}
			initialValues={initState}
			schema={schema}
			submitButtonText={SubmitButtonText}
		>
			<Input name="title" placeholder="Todo's name" title="Title" />
			<Textarea
				name="description"
				placeholder="Todo's description"
				title="Description"
			/>
			<div className={CheckBoxContainer}>
				<CustomToggle name="isCompleted" title="isCompleted" />
				<CustomCheckBox name="isPrivate" title="Private Todo" />
			</div>
		</UtilForm>
	);
}
