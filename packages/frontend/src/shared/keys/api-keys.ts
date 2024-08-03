enum ApiResources {
	TODOS = 'todos',
	USER = 'user',
}

export const ApiTodoEndpoints = {
	ALL: `${ApiResources.TODOS}/all`,
	CREATE: `${ApiResources.TODOS}/add`,
	GETTODOBYID: (id: number) => `${ApiResources.TODOS}/${id}`,
} as const;
