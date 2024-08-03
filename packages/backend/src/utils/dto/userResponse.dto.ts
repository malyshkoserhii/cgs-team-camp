import { User } from '@prisma/client';

export class UserResponseDto {
	id: number;
	name: string;
	email: string;
	todos: number[];

	constructor(model: User & { todos: { id: number }[] }) {
		this.id = model.id;
		this.email = model.email;
		this.name = model.name;
		this.todos = model?.todos.map((todo) => todo.id);
	}
}
