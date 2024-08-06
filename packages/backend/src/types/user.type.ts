export interface IUser {
	email: string;
	name: string;
	password: string;
}

export interface IUserSession extends Omit<IUser, 'password'> {
	id: number;
}
