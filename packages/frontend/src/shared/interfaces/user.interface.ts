export interface IUser {
	id: number;
	username: string;
	email: string;
	veryfi: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IRegisterData {
	email: string;
	password: string;
	username: string;
}

export interface ChangePasswordData {
	oldPassword: string;
	newPassword: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface LoginResponse {
	data: IUser;
	token: string;
}
