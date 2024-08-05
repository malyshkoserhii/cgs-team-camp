enum ApiResources {
	TODOS = 'todos',
	USER = 'user',
}

export const ApiTodoEndpoints = {
	ALL: `${ApiResources.TODOS}/all`,
	CREATE: `${ApiResources.TODOS}/add`,
	GETTODOBYID: (id: number) => `${ApiResources.TODOS}/${id}`,
} as const;
export const ApiAuthEndpoints = {
	REGISTER: `${ApiResources.USER}/register`,
	LOGIN: `${ApiResources.USER}/login`,
	FORGET_PASSWORD: `${ApiResources.USER}/forget-password`,
	CHANGE_PASSWORD: `${ApiResources.USER}/change-password`,
	RESET_PASSWORD: (id: string) => `${ApiResources.USER}/reset-password/${id}`,
	CURRENT_USER: `${ApiResources.USER}/current-user`,
	UPDATE_USER: `${ApiResources.USER}/update-user`,
} as const;
