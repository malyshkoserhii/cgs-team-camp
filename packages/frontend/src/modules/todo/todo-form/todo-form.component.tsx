import { FormikProps } from 'formik';
import React from 'react';
import { ITodo } from '../todo-item/todo-item.component';
import {
    CheckInput,
	Form,
	Horizontal,
	HorizontalConatiner,
	Input,
	InputContainer,
	TextArea,
	TitleForm,
	TitleInput,
} from './todo-form.styled';

export const TodoForm =
	(/*{ formik }: { formik: FormikProps<ITodo> },isUpdate: boolean,todo?: ITodo*/) => {
		return (
			<form className={Form} action="">
				<h1 className={TitleForm}>
					{true ? 'Update TODO' : 'Create TODO'}
				</h1>
				<div className={InputContainer}>
					<p className={TitleInput}> Title</p>
					<input
						className={Input}
						name="title"
						onChange={() => {}}
						type="text"
						placeholder={!true && 'Todo title . . .'}
					/>
				</div>
				<div className={InputContainer}>
					<p className={TitleInput}>Description</p>
					<textarea className={TextArea} name="desc" id=""></textarea>
				</div>
				<div className={Horizontal}>
					<div className={HorizontalConatiner}>
						<p className={CheckInput}>Completeness</p>
						<input type="checkbox" name="isCompleted" id="" />
					</div>

					<div className={HorizontalConatiner}>
						<p className={CheckInput}>Private</p>
						<input
							defaultChecked
							type="checkbox"
							name="isPrivate"
							id=""
						/>
					</div>
				</div>
			</form>
		);
	};
