export const Messages = {
	CREATED_SUCCESSFULLY: (label: string): string =>
		`${label} created successfully.`,
	UPDATED_SUCCESSFULLY: (label: string): string =>
		`${label} updated successfully.`,
	DELETED_SUCCESSFULLY: (label: string): string =>
		`${label} deleted successfully.`,
	IS_LOADING: (label: string): string => `${label} is loading.`,
	REGISTER_SUCCESS: (label: string): string =>
		`Registration successful for ${label}.`,
	LOGIN_SUCCESS: (label: string): string =>
		`${label} logged in successfully.`,
	LOGOUT_SUCCESS: (label: string): string =>
		`${label} logged out successfully.`,
	REFRESH_SUCCESS: (label: string): string =>
		`Tokens refreshed successfully for ${label}.`,
	PASSWORD_RESET_REQUESTED: (label: string): string =>
		`Password reset requested for ${label}.`,
	PASSWORD_RESET_SUCCESSFUL: (label: string): string =>
		`Password reset successfully for ${label}.`,
	EMAIL_SENT: 'Email with confirmation link was sent.',
};
