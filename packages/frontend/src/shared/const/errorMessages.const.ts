export const ErrorMessages = {
	ERROR: 'Error',
	EMAIL_REQUIRED: 'Email is required.',
	INVALID_EMAIL: 'Email must be a valid email.',
	PASSWORD_ERROR_MESSAGE:
		'Password must contain at least 2 lowercase, 2 uppercase, 2 digits, and 2 special characters',
	PASSWORD_REQUIRED: 'Password is required.',
	IS_REQUIRED: (label: string): string => `${label} is required.`,
	AT_LEAST_LENGTH: (length: number, label: string): string =>
		`${label} must be at least ${length} characters.`,
	AT_MOST_LENGTH: (length: number, label: string): string =>
		`${label} must be at most ${length} characters.`,
	MIN_LENGTH: ({
		length,
		label,
	}: {
		length: number;
		label?: string;
	}): string =>
		`${label ? label : 'Minimum'} length should be ${length} characters.`,
	AUTHORIZATION_ERROR: (message?: string): string =>
		message || 'Authentication error.',
};
