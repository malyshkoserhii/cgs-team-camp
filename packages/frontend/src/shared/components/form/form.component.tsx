import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import {
	formContainerStyles,
	formStyles,
	titleStyles,
	buttonStyles,
	errorMessageStyles,
} from './todo.form.styles';
import { Todo } from '~types/types';
import { Button, Intent } from '@blueprintjs/core';

export interface FormData extends Omit<Todo, 'id'> {}

interface FormProps {
	handleSubmit: UseFormHandleSubmit<FormData, undefined>;
	onSubmit: (data: FormData) => Promise<void>;
	title: string;
	children?: React.ReactNode;
	submitError?: string;
}

export const Form: React.FC<FormProps> = ({
	handleSubmit,
	onSubmit,
	title,
	children,
	submitError,
}) => {
	return (
		<div className={formContainerStyles}>
			<form className={formStyles} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={titleStyles}>{title}</h2>
				{children}
				{submitError && (
					<div className={errorMessageStyles}>{submitError}</div>
				)}
				<Button
					className={buttonStyles}
					type="submit"
					intent={Intent.PRIMARY}
				>
					Submit
				</Button>
			</form>
		</div>
	);
};
