import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthService } from '~/services/auth.service';
import { QUERY_KEYS } from '../queryKeys';

import type { LoginInput, RegisterInput, UpdateUserInput } from '~typings/user';

const authService = new AuthService();

export const useGetUserProfile = (id) => {
	return useQuery({
		queryKey: QUERY_KEYS.profileById(id),
		queryFn: () => authService.getUserProfile(id),
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newUserData: UpdateUserInput) =>
			authService.updateUser(newUserData),
		onSuccess: ({ id }) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.profileById(id),
			});
		},
	});
};

export const useChangePassword = () => {
	return useMutation({
		mutationFn: ({
			oldPassword,
			newPassword,
		}: {
			oldPassword: string;
			newPassword: string;
		}) => authService.changePassword(oldPassword, newPassword),
	});
};

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: (email: string) => authService.forgotPassword(email),
	});
};

export const useResetPassword = () => {
	return useMutation({
		mutationFn: ({
			resetToken,
			newPassword,
		}: {
			resetToken: string;
			newPassword: string;
		}) => authService.resetPassword(resetToken, newPassword),
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: () => authService.logout(),
	});
};

export const useLogin = () => {
	return useMutation({
		mutationFn: (credentials: LoginInput) => authService.login(credentials),
	});
};

export const useRegister = () => {
	return useMutation({
		mutationFn: (userData: RegisterInput) => authService.register(userData),
	});
};

export const useVerifyEmail = () => {
	return useMutation({
		mutationFn: (token: string) => authService.verifyEmail(token),
	});
};

export const useResendVerification = () => {
	return useMutation({
		mutationFn: (email: string) =>
			authService.resendVerificationEmail(email),
	});
};
