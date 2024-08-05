export const todoKeys = {
	todos: ['todos'] as const,
	todoById: (id: string) => ['todos', id] as const,
};
