enum ApiResources {
	TODOS = 'todos',
	USER = 'user',
}

export const ApiTodoEndpoints = {
	ALL: `${ApiResources.TODOS}`,
	CREATE: `${ApiResources.TODOS}`,
	GETBYID: (id: number) => `${ApiResources.TODOS}/${id}`,
} as const;

export const ApiUserEndpoints = {
	LOGIN: `${ApiResources.USER}/login`,
	REGISTRATION: `${ApiResources.USER}/register`,
} as const;
