import React from 'react';
import { Form } from 'react-final-form';

import { Schema } from 'joi';
import Button from '~shared/components/button/button.component';
import { FormContainer } from '~shared/components/form/form.styles';
import { Input } from '~shared/components/input/input.component';
import { Select } from '~shared/components/select/select.component';
import { Textarea } from '~shared/components/textarea/textarea.component';

import { TodoFormInitState } from '~shared/constants/form-initial-values/todo-form-init-values';
import { Todo } from '~shared/types/Todo.types';
import { validate } from '~shared/utils/form.validator';

type AddTodoProps = {
	onSubmit(todo: Todo): void;
	initState: typeof TodoFormInitState;
	schema: Schema;
	SubmitButtonText?: string;
};

export function AddTodoForm({
	onSubmit,
	initState,
	schema,
	SubmitButtonText = 'Create Todo',
}: AddTodoProps): JSX.Element {
	function handleSubmit(values: Todo): void {
		onSubmit(values);
	}
	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initState}
			validate={(values) => validate(values, schema)}
			render={({ handleSubmit, submitFailed, submitting }) => (
				<form onSubmit={handleSubmit} className={FormContainer}>
					<Input
						name="title"
						placeholder="Todo's name"
						title="Title"
					/>
					<Textarea
						name="description"
						placeholder="Todo's description"
						title="Description"
					/>

					<Select
						name="isCompleted"
						title="Completed"
						parse={(value) => value === 'true'}
						submitFailed={submitFailed}
					>
						<option value="true">Done</option>
						<option value="false">Not Done</option>
					</Select>
					<Select
						name="isPrivate"
						title="Private"
						parse={(value) => value === 'true'}
						submitFailed={submitFailed}
					>
						<option value="true">Private</option>
						<option value="false">Public</option>
					</Select>

					{submitFailed && (
						<div>
							<p> submit failed</p>
						</div>
					)}
					<Button
						type="submit"
						text={SubmitButtonText}
						disabled={submitting}
					/>
				</form>
			)}
		/>
	);
}
