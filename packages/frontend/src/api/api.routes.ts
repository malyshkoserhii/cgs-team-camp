export const apiRoutes = {
	todos: 'todos',
	todo: (id: string): string => `todos/${id}`,
	login: 'login',
	register: 'register',
	resetPassword: 'reset-password',
};
