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
	fogetPassword,
} from '~shared/interfaces/user.interface';
import { STORAGE_KEYS } from '~shared/keys';
import AuthService from '~shared/services/auth.service';

interface IAuthStore {
	user: IUser | null;
	token: string | null;
	loading: boolean;
	error: AxiosError | null;
	register: (data: IRegisterData) => Promise<void>;
	login: (data: LoginData) => Promise<void>;
	logOut: () => void;
	verifyEmail: (verifyToken: string) => Promise<void>;
	getCurrentUser: () => Promise<void>;
	changePassword: (passwords: ChangePasswordData) => Promise<void>;
	fogetPassword: (fogetPassword: fogetPassword) => Promise<void>;
	resetPassword: (resetToken: string, newPassword: string) => Promise<void>;
}

const authService = new AuthService();

export const useAuthStore = create<IAuthStore>()(
	immer((set) => {
		return {
			user: null,
			loading: false,
			error: null,
			token: null,

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
					const { data, token } = await authService.login(loginData);

					set({
						user: data,
						token: token,
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

			logOut: (): void => {
				localStorage.removeItem(STORAGE_KEYS.TOKEN);
				set({
					user: null,
					token: null,
				});
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

			fogetPassword: async (
				fogetPasswordData: fogetPassword,
			): Promise<void> => {
				set({ loading: true });

				try {
					await authService.fogetPAssword(fogetPasswordData);

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

			resetPassword: async (resetToken, newPassword): Promise<void> => {
				set({ loading: true });

				try {
					const data = await authService.resetPassword(
						resetToken,
						newPassword,
					);

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
