import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import {
	formContainerStyles,
	formStyles,
	titleStyles,
	buttonStyles,
	errorMessageStyles,
} from './todo.form.styles';
import { Button, Intent } from '@blueprintjs/core';

interface FormProps<T extends Record<string, unknown>> {
	handleSubmit: UseFormHandleSubmit<T, undefined>;
	onSubmit: (data: T) => Promise<void>;
	title: string;
	children?: React.ReactNode;
	submitError?: string;
	submitButtonText?: string;
}

export const Form = <T extends Record<string, unknown>>({
	handleSubmit,
	onSubmit,
	title,
	children,
	submitError,
	submitButtonText = 'Submit',
}: FormProps<T>): React.ReactElement => {
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
					{submitButtonText}
				</Button>
			</form>
		</div>
	);
};
