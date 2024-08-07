import React, { ReactNode, useCallback } from 'react';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { FormGroup, InputGroup, Intent } from '@blueprintjs/core';

type TextFieldProps<T> = {
	name: keyof T & string;
	type: string;
	label: string;
	placeholder: string;
	errors: FormikErrors<T>;
	touched: FormikTouched<T>;
};

const TextField = <T extends Record<string, unknown>>({
	name,
	type,
	label,
	placeholder,
	errors,
	touched,
}: TextFieldProps<T>): JSX.Element => {
	const error = errors[name];
	const isTouched = touched[name];

	const getHelperText = useCallback((): ReactNode => {
		if (isTouched && error) {
			return typeof error === 'string' ? error : null;
		}
		return null;
	}, [error, isTouched]);

	return (
		<FormGroup
			label={label}
			labelFor={name}
			intent={isTouched && error ? Intent.DANGER : Intent.NONE}
			helperText={getHelperText()}
		>
			<Field name={name}>
				{({ field }) => (
					<InputGroup
						{...field}
						id={name}
						type={type}
						placeholder={placeholder}
						intent={
							isTouched && error ? Intent.DANGER : Intent.NONE
						}
					/>
				)}
			</Field>
		</FormGroup>
	);
};

export default TextField;
