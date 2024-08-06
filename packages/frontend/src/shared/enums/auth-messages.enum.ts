export const AuthMessages = {
	REGISTER_SUCCESS: 'Registered successfully. Redirecting to login page',
	LOGIN_SUCCESS: (name: string): string => ` Welcome, ${name}`,
	PASSWORD_CHANGED: 'Password changed successfully',
	EMAIL_SEND: 'Verification email has been sent. Check your email',
	EMAIL_VERIFICATION_WARN: 'Don\t forget to verify your email',
	USER_UPDATED: 'User info successfully updated',
} as const;
export const AuthErrorMessages = {
	LOGIN_FAILED: (err: string): string => ` Failed to login, ${err}`,

	REGISTER_FAILED: (err: string): string => ` Failed to register, ${err}`,
	GENERAL_ERROR_MESSAGE: (err: string): string =>
		` Something went wrong, ${err}`,
	UPDATE_USER_ERROR: (err: string): string =>
		` Failed to update user, ${err}`,
	CURRENT_USER_ERROR: (err: string): string =>
		` Failed to get current user, ${err}`,
};
