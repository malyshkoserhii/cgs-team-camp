enum TodoStatus {
	InProgress,
	Completed,
}

export type Todo = {
	id: string;
	name: string;
	description?: string;
	status?: TodoStatus;
	createdAt: Date;
	updatedAt: Date;
	// assigneeId  string;
	// assignee    User;
};
