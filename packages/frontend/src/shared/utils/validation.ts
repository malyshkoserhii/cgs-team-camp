import { Schema, ValidationError } from 'joi';

// interface ValidationError {
// 	[key: string]: string;
// }

export function todoValidate<T>(data: T, schema: Schema): ValidationError {
	// const errors: { [key: string]: string } = {};
	const { error } = schema.validate(data, { abortEarly: false });

	// if (error && error instanceof ValidationError) {
	// 	error.details.forEach((detail) => {
	// 		errors[detail.path.join('.')] = detail.message;
	// 	});
	// }

	return error;
}
