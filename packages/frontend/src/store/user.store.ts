import { AxiosError } from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Messages } from '~shared/const/messages.const';
import { setTokens } from '~shared/helpers/setTokens';
import { TokenI, UserI } from '~shared/interfaces/user.interface copy';
import userService from '~shared/services/http/user.service';
import { notificationService } from '~shared/services/notificationService';

interface UserStore {
	user: UserI | null;
	tokens: TokenI | null;
	loading: boolean;
	registerLoading: boolean;
	loginLoading: boolean;
	logoutLoading: boolean;
	refreshLoading: boolean;
	confirmTokenIsLoading: boolean;
	error: AxiosError | null;
	resetIsLoading: boolean;
	register: (data: {
		email: string;
		password: string;
		name: string;
	}) => Promise<void>;
	login: (data: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
	requestPasswordReset: (email: string) => Promise<void>;
	resetPassword: (token: string, password: string) => Promise<void>;
	registerConfirmation: (id: string) => Promise<void>;
	currentUser: () => Promise<void>;
}

const name = 'User';

export const useUserStore = create<UserStore>()(
	immer((set) => ({
		user: null,
		tokens: null,
		loading: false,
		registerLoading: false,
		loginLoading: false,
		logoutLoading: false,
		confirmTokenIsLoading: true,
		refreshLoading: false,
		resetIsLoading: false,
		error: null,
		register: async (data: {
			email: string;
			password: string;
			name: string;
		}): Promise<void> => {
			set((state) => {
				state.registerLoading = true;
				state.error = null;
			});
			try {
				await userService.register(data);
				notificationService.success(Messages.EMAIL_SENT);
				set((state) => {
					state.registerLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.registerLoading = false;
				});
			}
		},

		login: async (data: {
			email: string;
			password: string;
		}): Promise<void> => {
			set((state) => {
				state.loginLoading = true;
				state.error = null;
			});
			try {
				const response = await userService.login(data);
				setTokens(response.data.tokens);
				notificationService.success(Messages.LOGIN_SUCCESS(name));
				set((state) => {
					state.user = response.data.user;
					state.tokens = response.data.tokens;
					state.loginLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.loginLoading = false;
				});
			}
		},

		logout: async (): Promise<void> => {
			set((state) => {
				state.logoutLoading = true;
				state.error = null;
			});
			try {
				await userService.logout();
				set((state) => {
					state.user = null;
					state.tokens = null;
					state.logoutLoading = false;
				});
				notificationService.success(Messages.LOGOUT_SUCCESS(name));
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.logoutLoading = false;
				});
			}
		},

		requestPasswordReset: async (email: string): Promise<void> => {
			set((state) => {
				state.resetIsLoading = true;
				state.error = null;
			});
			try {
				await userService.requestPasswordReset(email);
				notificationService.success(
					Messages.PASSWORD_RESET_REQUESTED(name),
				);
				set((state) => {
					state.resetIsLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.resetIsLoading = false;
				});
			}
		},

		resetPassword: async (
			token: string,
			password: string,
		): Promise<void> => {
			set((state) => {
				state.resetIsLoading = true;
				state.error = null;
			});
			try {
				await userService.resetPassword(token, password);
				notificationService.success(
					Messages.PASSWORD_RESET_SUCCESSFUL(name),
				);
				set((state) => {
					state.resetIsLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.resetIsLoading = false;
				});
			}
		},

		registerConfirmation: async (id: string): Promise<void> => {
			set((state) => {
				state.confirmTokenIsLoading = true;
				state.error = null;
			});
			try {
				await userService.registerConfirmation(id);
				set((state) => {
					state.confirmTokenIsLoading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.confirmTokenIsLoading = false;
				});
			}
		},

		currentUser: async (): Promise<void> => {
			set((state) => {
				state.loading = true;
				state.error = null;
			});
			try {
				const response = await userService.currentUser();
				set((state) => {
					state.user = response.data.user;
					state.loading = false;
				});
			} catch (error) {
				set((state) => {
					state.error = error as AxiosError;
					state.loading = false;
				});
			}
		},
	})),
);
