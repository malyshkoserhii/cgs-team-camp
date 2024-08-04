import { TodoStatus } from '~typings/todo';

export const showTodoStatus = (status: TodoStatus) => {
	return status === TodoStatus.Completed ? 'Completed' : 'In Progress';
};
