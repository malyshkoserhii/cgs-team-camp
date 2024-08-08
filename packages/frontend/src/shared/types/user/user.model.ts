import { IUser } from './user.types';

class UserModel implements IUser {
	id: number;

	email: string;

	name: string;

	constructor(id: number, email: string, name: string) {
		this.id = id;
		this.email = email;
		this.name = name;
	}
}

const createUserModel = (userFromServer: UserModel): UserModel =>
	new UserModel(userFromServer.id, userFromServer.email, userFromServer.name);

export { createUserModel };

export default UserModel;
