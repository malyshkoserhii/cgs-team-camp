import React, { FC, useCallback, useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Button, FormGroup, Switch } from '@blueprintjs/core';

import { actionButtonsWrapper, formWrapperStyles } from './todo-form.styles';
import { getErrorMessage } from '~/utils/getErrorMessage';
import TextField from '~shared/components/text-field/text-field.component';
import { TodoSchema } from './const';

import { TodoStatus, type Todo } from '~typings/todo';

type TodoFormProps = {
	initialValues?: Todo;
	onClose: () => void;
	onSubmit: (values: Todo) => void;
};

const TodoForm: FC<TodoFormProps> = ({ onClose, initialValues, onSubmit }) => {
	const defaultValues = useMemo(
		() => ({
			name: initialValues?.name ?? '',
			description: initialValues?.description ?? '',
			status: initialValues?.status ?? TodoStatus.InProgress,
			isPrivate: initialValues?.isPrivate ?? false,
			...initialValues,
		}),
		[initialValues],
	);

	const handleStatusChange = useCallback(
		(
			setFieldValue: (field: string, value: TodoStatus) => void,
			currentStatus: TodoStatus,
		) => {
			setFieldValue(
				'status',
				currentStatus === TodoStatus.Completed
					? TodoStatus.InProgress
					: TodoStatus.Completed,
			);
		},
		[],
	);

	const handlePrivateChange = useCallback(
		(
			setFieldValue: (field: string, value: boolean) => void,
			currentIsPrivate: boolean,
		) => {
			setFieldValue('isPrivate', !currentIsPrivate);
		},
		[],
	);

	const handleFormSubmit = useCallback(
		(values, { setSubmitting }) => {
			onSubmit(values);
			setSubmitting(false);
			onClose();
		},
		[onSubmit, onClose],
	);

	return (
		<div className={formWrapperStyles}>
			<h2>{initialValues ? 'Edit Todo' : 'Add Todo'}</h2>
			<Formik
				initialValues={defaultValues}
				validationSchema={TodoSchema}
				onSubmit={handleFormSubmit}
			>
				{({ errors, touched, isSubmitting, values, setFieldValue }) => (
					<Form>
						<TextField<Todo>
							name="name"
							type="text"
							label="Name"
							placeholder="Enter todo name"
							errors={errors}
							touched={touched}
						/>

						<TextField<Todo>
							name="description"
							type="text"
							label="Description"
							placeholder="Enter todo description"
							errors={errors}
							touched={touched}
						/>

						<FormGroup
							label="Status"
							labelFor="status"
							helperText={
								touched.status && getErrorMessage(errors.status)
							}
							intent={
								touched.status && errors.status
									? 'danger'
									: 'none'
							}
						>
							<Switch
								checked={values.status === TodoStatus.Completed}
								label={
									values.status === TodoStatus.Completed
										? 'Completed'
										: 'In Progress'
								}
								onChange={() =>
									handleStatusChange(
										setFieldValue,
										values.status,
									)
								}
							/>
						</FormGroup>

						<FormGroup
							label="Access"
							labelFor="isPrivate"
							helperText={
								touched.isPrivate &&
								getErrorMessage(errors.isPrivate)
							}
							intent={
								touched.isPrivate && errors.isPrivate
									? 'danger'
									: 'none'
							}
						>
							<Switch
								checked={values.isPrivate}
								label={values.isPrivate ? 'Private' : 'Public'}
								onChange={() =>
									handlePrivateChange(
										setFieldValue,
										values.isPrivate,
									)
								}
							/>
						</FormGroup>

						<div className={actionButtonsWrapper}>
							<Button onClick={onClose}>Cancel</Button>
							<Button
								type="submit"
								intent="primary"
								disabled={isSubmitting}
							>
								{initialValues ? 'Update' : 'Add'}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default TodoForm;
