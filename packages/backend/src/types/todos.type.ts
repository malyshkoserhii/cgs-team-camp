// TODO: Put a real types here

enum TodoStatus {
	Todo,
	InProgress,
	OnHold,
	Done,
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
