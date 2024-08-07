export type User = {
	id: string;
	email: string;
	name?: string | null;
	isVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type OAuth = {
	id: string;
	accessToken: string;
	refreshToken: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type UpdateUserInput = Partial<
	Omit<User, 'email' | 'createdAt' | 'updatedAt'>
>;

export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

export type LoginInput = {
	email: string;
	password: string;
};

export type ChangePasswordInput = {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
};

export type EmailInput = {
	email: string;
};

export type NameInput = {
	name: string;
};

export type ResetPasswordInput = {
	newPassword: string;
	confirmPassword: string;
};

export enum VerificationStatus {
	Loading = 'loading',
	Success = 'success',
	Error = 'error',
}
