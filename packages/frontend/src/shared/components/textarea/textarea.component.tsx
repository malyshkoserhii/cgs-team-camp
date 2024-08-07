import React, { useMemo } from 'react';
import { textareaStyles } from './textarea.styles';
import { UseFormRegister, FieldError, Path } from 'react-hook-form';
import { errorMessageStyles } from '../textinput/textinput.styles';

interface FormFieldProps<T extends Record<string, unknown>> {
	name: Path<T>;
	register: UseFormRegister<T>;
	placeholder: string;
	defaultValue?: string;
	required: boolean;
	error?: FieldError;
	minLength?: number;
	maxLength?: number;
}

export const TextArea = <T extends Record<string, unknown>>({
	name,
	register,
	placeholder,
	defaultValue,
	required,
	error,
	minLength,
	maxLength,
}: FormFieldProps<T>): React.ReactElement => {
	const sharedProps = useMemo(
		() => ({
			className: textareaStyles,
			...register(name, {
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
