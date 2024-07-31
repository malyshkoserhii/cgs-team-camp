export const joiErrorMessages = {
	string: (field: string): { [key: string]: string } => ({
		'string.empty': `Field ${field} cannot be empty.`,
		'string.base': `Field ${field} must be a string.`,
		'any.required': `Field ${field} is required.`,
	}),
	boolean: (field: string): { [key: string]: string } => ({
		'boolean.base': `Field ${field} must be a boolean.`,
		'any.required': `Field ${field} is required.`,
	}),
	objMin: (): { [key: string]: string } => ({
		'object.min': 'Validation failed.',
	}),
};
