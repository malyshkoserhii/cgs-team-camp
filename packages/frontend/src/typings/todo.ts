export enum TodoStatus {
	InProgress = 'InProgress',
	Completed = 'Completed',
}

export type Todo = {
	id: string;
	name: string;
	description?: string;
	status?: TodoStatus;
	isPrivate: boolean;
	createdAt?: Date;
	updatedAt?: Date;
};
