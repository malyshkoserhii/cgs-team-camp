export type User = {
	id: number;
	email: string;
	username: string;
	emailVerified: boolean;
	password: string;
	createdAt?: Date;
	updatetAt?: Date;
};
export type UserNoSensetiveData = Omit<User, 'password'>;
export type LoginUserType = {
	email: string;

	password: string;
};
export type RegisterUserType = {
	email: string;
	username: string;
	password: string;
};

export type LoginUserResponse = {
	user: UserNoSensetiveData;
	access_token: string;
};
export type changePasswordType = {
	oldPassword: string;
	newPassword: string;
};
export type forgetPasswordType = {
	email: string;
};
export type EditUserType = {
	username: string;
};
export type resetPasswordType = {
	newPassword: string;
};
