import { User } from '@prisma/client';

export class UserResponseDto {
	id: number;
	name: string;
	email: string;

	constructor(model: User) {
		this.id = model.id;
		this.email = model.email;
		this.name = model.name;
	}
}
