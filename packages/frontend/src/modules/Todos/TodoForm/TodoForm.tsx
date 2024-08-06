import React, { useMemo } from 'react';

import { Schema } from 'joi';
import { Input } from '~shared/components/input/input.component';
import { Select } from '~shared/components/select/select.component';
import { Textarea } from '~shared/components/textarea/textarea.component';

import { UtilForm } from '~shared/components/form/form';
import { TodoFormInitState } from '~shared/constants/form-initial-values/todo-form-init-values';
import { Todo } from '~shared/types/todo.types';

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
	const initStateS = useMemo(() => {
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
			initialValues={initStateS}
			schema={schema}
			submitButtonText={SubmitButtonText}
		>
			<Input name="title" placeholder="Todo's name" title="Title" />
			<Textarea
				name="description"
				placeholder="Todo's description"
				title="Description"
			/>
			<Select
				name="isCompleted"
				title="Completed"
				parse={(value) => value === 'true'}
			>
				<option value="true">Done</option>
				<option value="false">Not Done</option>
			</Select>
			<Select
				name="isPrivate"
				title="Private"
				parse={(value) => value === 'true'}
			>
				<option value="true">Private</option>
				<option value="false">Public</option>
			</Select>
		</UtilForm>
	);
}
