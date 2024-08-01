import { Schema, ValidationError } from 'joi';

export type ValidationErrorType = {
	[key: string]: string;
};

export function validate<T>(values: T, schema: Schema): ValidationErrorType {
	const errors: { [key: string]: string } = {};
	const { error } = schema.validate(values, { abortEarly: false });

	if (error && error instanceof ValidationError) {
		error.details.forEach((detail) => {
			errors[detail.path.join('.')] = detail.message;
		});
	}

	return errors;
}
