import { User } from '@prisma/client';

export type UserType = User;

export type CreateUserType = Omit<User, 'id'>;
export type UpdateUserType = Partial<User>;
export type UserNoSensitiveData = Omit<User, 'password'>;
export type ChangePasswordType = {
	newPassword: string;
	oldPassword: string;
};
