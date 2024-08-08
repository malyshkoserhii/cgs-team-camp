import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ERROR_MESSAGES } from '~shared/constants/errorMessages';
import {
	ChangePasswordData,
	IRegisterData,
	IUser,
	LoginData,
} from '~shared/interfaces/user.interface';
import AuthService from '~shared/services/auth.service';

interface IAuthSrore {
	user: IUser | null;
	loading: boolean;
	error: AxiosError | null;
	register: (data: IRegisterData) => Promise<void>;
	login: (data: LoginData) => Promise<void>;
	verifyEmail: (verifyToken: string) => Promise<void>;
	getCurrentUser: () => Promise<void>;
	changePassword: (passwords: ChangePasswordData) => Promise<void>;
	fogetPassword: (email: string) => Promise<void>;
	resetPassword: (resetToken: string) => Promise<void>;
}

const authService = new AuthService();

export const useAuthStore = create<IAuthSrore>()(
	immer((set) => {
		return {
			user: null,
			loading: false,
			error: null,

			register: async (registerData: IRegisterData): Promise<void> => {
				set({
					loading: true,
				});

				try {
					const data = await authService.register(registerData);

					set({
						user: data.data,
						error: null,
						loading: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, { variant: 'error' });
					set({
						error: error.message,
						loading: false,
					});
				}
			},

			login: async (loginData: LoginData): Promise<void> => {
				set({ loading: true });

				try {
					const data = await authService.login(loginData);

					set({
						user: data.data,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, { variant: 'error' });
					set({
						loading: false,
					});
				}
			},

			verifyEmail: async (verificationToken: string): Promise<void> => {
				set({ loading: true });

				try {
					const data =
						await authService.verifyEmail(verificationToken);

					set({
						user: data.data,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, { variant: 'error' });

					set({
						error: error.message,
						loading: false,
					});
				}
			},

			getCurrentUser: async (): Promise<void> => {
				set({
					loading: true,
				});

				try {
					const data = await authService.getCurrentUser();

					set({
						user: data.data,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, { variant: 'error' });

					set({
						loading: false,
						error: error.message,
					});
				}
			},

			changePassword: async (
				passwords: ChangePasswordData,
			): Promise<void> => {
				set({ loading: true });

				try {
					await authService.changePassword(passwords);

					set({
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, { variant: 'error' });

					set({
						loading: false,
						error: error.message,
					});
				}
			},

			fogetPassword: async (email: string): Promise<void> => {
				set({ loading: true });

				try {
					await authService.fogetPAssword(email);

					set({
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, { variant: 'error' });

					set({
						loading: false,
						error: error.message,
					});
				}
			},

			resetPassword: async (resetToken): Promise<void> => {
				set({ loading: true });

				try {
					const data = await authService.resetPassword(resetToken);

					set({
						user: data.data,
						loading: false,
						error: null,
					});
				} catch (error) {
					enqueueSnackbar(ERROR_MESSAGES.WRONG, { variant: 'error' });

					set({
						loading: false,
						error: error.message,
					});
				}
			},
		};
	}),
);
