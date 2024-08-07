import React from 'react';
import {
	ComponentWithAs,
	FormControl,
	FormErrorMessage,
	FormLabel,
	InputProps,
	TextareaProps,
} from '@chakra-ui/react';
import { Field } from 'react-final-form';

interface FormInputProps extends InputProps {
	name: string;
	placeholder?: string;
	Component:
		| ComponentWithAs<'input', InputProps>
		| ComponentWithAs<'textarea', TextareaProps>;
	label?: string;
}

export const FormInput: React.FunctionComponent<FormInputProps> = ({
	name,
	placeholder,
	children,
	Component,
	label,
	type = 'text',
}) => {
	return (
		<Field name={name}>
			{({ input, meta }) => (
				<FormControl isInvalid={meta.touched && meta.error}>
					{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
					<Component
						{...input}
						id={name}
						type={type}
						variant="filled"
						placeholder={placeholder}
					>
						{children}
					</Component>
					{meta.touched && meta.error && (
						<FormErrorMessage>{meta.error}</FormErrorMessage>
					)}
				</FormControl>
			)}
		</Field>
	);
};
