import { FormikProps } from 'formik';
import React from 'react';
import {
	CheckInput,
	Form,
	Horizontal,
	HorizontalConatiner,
	Input,
	InputContainer,
	SubmitButton,
	TextArea,
	TitleForm,
	TitleInput,
} from './todo-form.styled';
import { ITodo, ITodoCreate } from '~/types/todo.type';

export const TodoForm = ({
	formik,
}: {
	formik: FormikProps<ITodo | ITodoCreate>;
	isUpdate: boolean;
	todo?: ITodo;
}) => {
	return (
		<form onSubmit={formik.handleSubmit} className={Form} action="">
			<h1 className={TitleForm}>
				{true ? 'Update TODO' : 'Create TODO'}
			</h1>
			<div className={InputContainer}>
				<p className={TitleInput}> Title</p>
				<input
					value={formik.values.title}
					onChange={formik.handleChange}
					className={Input}
					name="title"
					type="text"
					placeholder={!true && 'Todo title . . .'}
				/>
			</div>
			<div className={InputContainer}>
				<p className={TitleInput}>Description</p>
				<textarea
					value={formik.values.description}
					className={TextArea}
					name="desc"
					id=""
					onChange={formik.handleChange}
				></textarea>
			</div>

			<div className={HorizontalConatiner}>
				<p className={CheckInput}>Private</p>
				<input
					checked={formik.values.isPrivate}
					onChange={formik.handleChange}
					defaultChecked
					type="checkbox"
					name="isPrivate"
					id=""
				/>
			</div>

			<button className={SubmitButton}>Save</button>
		</form>
	);
};
