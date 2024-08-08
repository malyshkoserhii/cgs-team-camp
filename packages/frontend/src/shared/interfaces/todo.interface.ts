import { TodoStatusE } from '~shared/enums/TodoStatus.enum';

export interface TodoI {
	id: number;
	name: string;
	description: string;
	isPrivate: boolean;
	status: TodoStatusE;
	createdAt: Date;
	updatedAt: Date;
	user: {
		name: string;
	};
}
