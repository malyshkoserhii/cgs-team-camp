import { Schema } from 'joi';
import React, { useEffect, useRef } from 'react';
import { Form } from 'react-final-form';

import { validate } from '~shared/utils/form.validator';
import Button from '../button/button.component';
import { FormContainer } from './form.styles';

interface UtilFormProps<T> {
	onSubmit: (values: T) => void;
	initialValues: T;
	schema: Schema;
	submitButtonText?: string;
	children: React.ReactNode;
	additionalStyles?: string;
	serverError?: string;
}

export function UtilForm<T>({
	onSubmit,
	initialValues,
	schema,
	submitButtonText = 'Submit',
	children,
	additionalStyles,
	serverError,
}: UtilFormProps<T>): JSX.Element {
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (formRef.current) {
			const firstInput = formRef.current.querySelector('input');
			if (firstInput) {
				firstInput.focus();
			}
		}
	}, []);

	function handleSubmit(values: T): void {
		onSubmit(values);
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validate={(values) => validate(values, schema)}
			render={({ handleSubmit, submitFailed, submitting }) => (
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className={`${FormContainer} ${additionalStyles || ''}`}
				>
					{children}

					{submitFailed && (
						<div>
							<p>submit failed</p>
						</div>
					)}
					{serverError && (
						<div>
							<p>{serverError}</p>
						</div>
					)}
					<Button
						type="submit"
						text={submitButtonText}
						disabled={submitting}
						loading={submitting}
					/>
				</form>
			)}
		/>
	);
}
