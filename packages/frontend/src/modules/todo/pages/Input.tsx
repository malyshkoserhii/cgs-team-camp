import React from 'react';
import {
	FieldError,
	FieldValues,
	Path,
	UseFormRegister,
} from 'react-hook-form';
import {
	inputContainerStyles,
	labelStyles,
	inputStyles,
} from './TodoPage.styles';

interface InputProps<T extends FieldValues> {
	id: Path<T>;
	label: string;
	type?: string;
	register: UseFormRegister<T>;
	errors?: FieldError;
	required?: boolean;
}

const Input = <T extends FieldValues>({
	id,
	label,
	type = 'text',
	register,
	errors,
	required = false,
}: InputProps<T>): JSX.Element => (
	<div className={inputContainerStyles}>
		<label htmlFor={String(id)} className={labelStyles}>
			{label}
		</label>
		<input
			id={String(id)}
			type={type}
			{...register(id, { required: required && `${label} is required` })}
			className={inputStyles}
		/>
		{errors && <p>{errors.message}</p>}
	</div>
);

export default Input;
