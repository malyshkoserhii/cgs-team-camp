export const joiErrorMessages = {
	string: (field: string): { [key: string]: string } => ({
		'string.empty': `Field ${field} cannot be empty.`,
		'string.base': `Field ${field} must be a string.`,
		'any.required': `Field ${field} is required.`,
		'string.alphanum': `Field ${field} must only contain alpha-numeric characters.`,
		'string.min': `Field ${field} should have a minimum length of {#limit}.`,
		'string.max': `Field ${field} should have a maximum length of {#limit}.`,
	}),
	boolean: (field: string): { [key: string]: string } => ({
		'boolean.base': `Field ${field} must be a boolean.`,
		'any.required': `Field ${field} is required.`,
	}),
	objMin: (): { [key: string]: string } => ({
		'object.min': 'Validation failed.',
	}),
	passwordPattern: (): { [key: string]: string } => ({
		'string.pattern.base':
			'Password must be 8+ characters, with uppercase, lowercase, number, and special character (e.g., !@#$%^&*).',
	}),
};
