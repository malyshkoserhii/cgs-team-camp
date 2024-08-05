import React, { useMemo } from 'react';
import { inputStyles, errorMessageStyles } from './textinput.styles';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '../form/form.component';

interface FormFieldProps {
	name: keyof FormData;
	register: UseFormRegister<FormData>;
	placeholder: string;
	defaultValue?: string;
	required: boolean;
	inputType?: string;
	error?: FieldError;
	minLength?: number;
	maxLength?: number;
}

export const TextInput: React.FC<FormFieldProps> = ({
	name,
	register,
	placeholder,
	defaultValue,
	required,
	inputType = 'text',
	error,
	minLength,
	maxLength,
}) => {
	const sharedProps = useMemo(
		() => ({
			className: inputStyles,
			...register(`${name}`, {
				required: required ? 'This field is required' : false,
				minLength: minLength
					? {
							value: minLength,
							message: `Minimum length is ${minLength} characters`,
						}
					: undefined,
				maxLength: maxLength
					? {
							value: maxLength,
							message: `Maximum length is ${maxLength} characters`,
						}
					: undefined,
			}),
			placeholder,
			defaultValue: defaultValue || '',
		}),
		[
			name,
			register,
			placeholder,
			defaultValue,
			required,
			minLength,
			maxLength,
		],
	);

	return (
		<div>
			<input type={inputType} {...sharedProps} />
			{error && (
				<span className={errorMessageStyles}>{error.message}</span>
			)}
		</div>
	);
};
