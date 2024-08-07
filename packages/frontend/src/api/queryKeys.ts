export const todoKeys = {
	todos: ['todos'] as const,
	todoById: (id: string) => ['todos', id] as const,
};

export const userKeys = {
	profileById: (id: string) => ['user', id] as const,
};

export const authKeys = {
	login: ['login'] as const,
	register: ['register'] as const,
	logout: ['logout'] as const,
	passwordReset: ['passwordReset'] as const,
};
