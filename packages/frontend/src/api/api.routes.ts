export const apiRoutes = {
	todos: 'todos',
	user: 'user',
	todo: (id: string): string => `todos/${id}`,
	login: 'login',
	logout: 'logout',
	register: 'register',
	veriftEmail: 'verify-email',
	resendVerification: 'resend-verification',
	changePassword: 'change-password',
	forgotPassword: 'forgot-password',
	resetPassword: 'reset-password',
	refreshToken: 'refresh-token',
};
