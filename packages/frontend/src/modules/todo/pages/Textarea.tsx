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

interface TextareaProps<T extends FieldValues> {
	id: Path<T>;
	label: string;
	register: UseFormRegister<T>;
	errors?: FieldError;
}

const Textarea = <T extends FieldValues>({
	id,
	label,
	register,
	errors,
}: TextareaProps<T>): JSX.Element => (
	<div className={inputContainerStyles}>
		<label htmlFor={String(id)} className={labelStyles}>
			{label}
		</label>
		<textarea id={String(id)} {...register(id)} className={inputStyles} />
		{errors && <p>{errors.message}</p>}
	</div>
);

export default Textarea;
