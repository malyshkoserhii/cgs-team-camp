import { User } from '@prisma/client';

export type UserType = User;
export type CreateUserType = Pick<User, 'email' | 'password' | 'username'>;
export type UserWithoutPassword = Omit<User, 'password'>;
export type ChangePasswordData = {
	oldPassword: string;
	newPassword: string;
};
