import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import {
	buttonStyle,
	checkboxStyle,
	errorTextStyle,
	formContainerStyle,
	formFieldStyle,
	inputStyle,
	labelStyle,
} from './todo-form.styled';
import * as Yup from 'yup';

export type TodoFormProps = {
	initialValues: {
		title: string;
		description: string;
	};
	onSubmit: (values: { title: string; description: string }) => void;
};

const TodoSchema = Yup.object().shape({
	title: Yup.string()
		.max(50, 'Title is too long!')
		.required('Title is required!'),
	description: Yup.string()
		.max(200, 'Description is too long!')
		.required('Description is required!'),
});

export const TodoForm: React.FC<TodoFormProps> = ({initialValues,onSubmit,}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={TodoSchema}
			onSubmit={(values, { setSubmitting }) => {     
				onSubmit(values);
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<div className={formContainerStyle}>
					<Form>
						<div className={formFieldStyle}>
							<label className={labelStyle} htmlFor="title">
								Title
							</label>
							<Field
								className={inputStyle}
								type="text"
								name="title"
								id="title"
							/>
							<ErrorMessage
								name="title"
								component="div"
								className={errorTextStyle}
							/>
						</div>
						<div className={formFieldStyle}>
							<label className={labelStyle} htmlFor="description">
								Description
							</label>
							<Field
								className={inputStyle}
								as="textarea"
								name="description"
								id="description"
								rows={4}
							/>
							<ErrorMessage
								name="description"
								component="div"
								className={errorTextStyle}
							/>
						</div>

                        <div className={formFieldStyle}>
                            <label className={labelStyle} htmlFor="isCompleted">
                                <Field css={checkboxStyle} type="checkbox" name="isCompleted" id="isCompleted" />
                                Completed
                            </label>
                            <ErrorMessage name="isCompleted" component="div" className={errorTextStyle} />
                        </div>
                        <div className={formFieldStyle}>
                            <label className={labelStyle} htmlFor="isPrivate">
                                <Field className={checkboxStyle} type="checkbox" name="isPrivate" id="isPrivate" />
                                Private
                            </label>
                            <ErrorMessage name="isPrivate" component="div" className={errorTextStyle} />
                        </div>
						<button
							className={buttonStyle}
							type="submit"
							disabled={isSubmitting}
						>
							{initialValues.title
								? 'Update Task'
								: 'Create Task'}
						</button>
					</Form>
				</div>
			)}
		</Formik>
	);
};
