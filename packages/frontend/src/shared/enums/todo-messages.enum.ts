export const TodoMessages = {
	TODO_CREATE_SUCCESS: 'Todo added successfully',
	TODO_UPDATE_SUCCESS: (name: string): string => ` ${name} updated`,
} as const;
export const TodoErrorMessages = {
	TODO_CREATE_FAIL: (err: string): string => `Failed to add todo, ${err}`,
	TODO_FETCH_FAIL: (err: string): string => `Failed to fetch todos, ${err}`,
	TODO_DELETE_FAIL: (err: string): string => `Failed to remove todo, ${err}`,
	TODO_UPDATE_FAIL: (err: string): string => `Failed to update todo, ${err}`,
};
