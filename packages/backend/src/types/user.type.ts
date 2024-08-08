export interface IUser {
	id: number;
	email: string;
	name: string | null;
	password: string;
	username: string;
	createdTime: Date;
	updatedTime: Date;
	resetPasswordToken: string | null;
	resetPasswordExpires: Date | null;
}

export interface IAuthResponse {
	token: string;
	user: IUser;
}
