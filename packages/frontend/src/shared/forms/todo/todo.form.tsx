import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup, Switch } from '@blueprintjs/core';
import * as Yup from 'yup';

import { formWrapperStyles } from './todo-form.styles';

import { TodoStatus, type Todo } from '~typings/todo';

type TodoFormProps = {
	initialValues?: Todo;
	onClose: () => void;
	onSubmit: (values: Todo) => void;
};

const TodoSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	description: Yup.string(),
	status: Yup.mixed().oneOf(Object.values(TodoStatus)),
	isPrivate: Yup.boolean(),
});

const TodoForm: React.FC<TodoFormProps> = ({
	onClose,
	initialValues,
	onSubmit,
}) => {
	const defaultValues = {
		name: initialValues?.name ?? '',
		description: initialValues?.description ?? '',
		status: initialValues?.status ?? TodoStatus.InProgress,
		isPrivate: initialValues?.isPrivate ?? false,
		...initialValues,
	};

	return (
		<div className={formWrapperStyles}>
			<h2>{initialValues ? 'Edit Todo' : 'Add Todo'}</h2>
			<Formik
				initialValues={defaultValues}
				validationSchema={TodoSchema}
				onSubmit={(values, { setSubmitting }) => {
					onSubmit(values);
					setSubmitting(false);
					onClose();
				}}
			>
				{({ errors, touched, isSubmitting, values, setFieldValue }) => (
					<Form>
						<FormGroup
							label="Name"
							labelFor="name"
							helperText={touched.name && errors.name}
							intent={
								touched.name && errors.name ? 'danger' : 'none'
							}
						>
							<Field
								as={InputGroup}
								id="name"
								name="name"
								placeholder="Enter todo name"
							/>
						</FormGroup>

						<FormGroup
							label="Description"
							labelFor="description"
							helperText={
								touched.description && errors.description
							}
							intent={
								touched.description && errors.description
									? 'danger'
									: 'none'
							}
						>
							<Field
								as={InputGroup}
								id="description"
								name="description"
								placeholder="Enter todo description"
							/>
						</FormGroup>

						<FormGroup
							label="Status"
							labelFor="status"
							helperText={touched.status && errors.status}
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
								onChange={() => {
									setFieldValue(
										'status',
										values.status === TodoStatus.Completed
											? TodoStatus.InProgress
											: TodoStatus.Completed,
									);
								}}
							/>
						</FormGroup>

						<FormGroup
							label="Access"
							labelFor="isPrivate"
							helperText={touched.isPrivate && errors.isPrivate}
							intent={
								touched.isPrivate && errors.isPrivate
									? 'danger'
									: 'none'
							}
						>
							<Switch
								checked={values.isPrivate}
								label={values.isPrivate ? 'Private' : 'Public'}
								onChange={() => {
									setFieldValue(
										'isPrivate',
										!values.isPrivate,
									);
								}}
							/>
						</FormGroup>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								gap: '10px',
							}}
						>
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
