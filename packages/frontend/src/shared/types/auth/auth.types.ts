import UserModel from '../user/user.model';

export interface AuthData {
	email: string;
	name?: string;
	password: string;
	token?: string;
}

export interface ReqResetPasswordData {
	email: string;
}

export interface ResetPasswordData {
	userId: number;
	token: string;
	password: string;
}

export interface LoginData {
	data: UserModel;
	token: string;
}
