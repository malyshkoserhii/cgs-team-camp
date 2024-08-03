import React from 'react';
import {
	ComponentWithAs,
	FormControl,
	FormErrorMessage,
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
}

export const FormInput: React.FunctionComponent<FormInputProps> = ({
	name,
	placeholder,
	children,
	Component,
}) => {
	return (
		<Field name={name}>
			{({ input, meta }) => (
				<FormControl isInvalid={meta.touched && meta.error}>
					<Component
						{...input}
						id={name}
						type="text"
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
