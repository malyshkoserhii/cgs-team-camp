export const QUERY_KEYS = {
	login: ['login'] as const,
	register: ['register'] as const,
	logout: ['logout'] as const,
	passwordReset: ['passwordReset'] as const,
	profileById: (id: string) => ['user', id] as const,
	todos: ['todos'] as const,
	todoById: (id: string) => ['todos', id] as const,
};
