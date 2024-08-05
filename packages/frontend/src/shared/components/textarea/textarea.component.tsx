import React, { useMemo } from 'react';
import { textareaStyles } from './textarea.styles';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '../form/form.component';
import { errorMessageStyles } from '../textinput/textinput.styles';

interface FormFieldProps {
	name: keyof FormData;
	register: UseFormRegister<FormData>;
	placeholder: string;
	defaultValue?: string;
	required: boolean;
	error?: FieldError;
	minLength?: number;
	maxLength?: number;
}

export const TextArea: React.FC<FormFieldProps> = ({
	name,
	register,
	placeholder,
	defaultValue,
	required,
	error,
	minLength,
	maxLength,
}) => {
	const sharedProps = useMemo(
		() => ({
			className: textareaStyles,
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
			<textarea {...sharedProps} />
			{error && (
				<span className={errorMessageStyles}>{error.message}</span>
			)}
		</div>
	);
};
