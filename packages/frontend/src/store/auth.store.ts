import { AxiosError } from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '~shared/keys/router-keys';
import AuthService from '~shared/services/auth.service';

import {
	changePasswordType,
	LoginUserType,
	RegisterUserType,
	User,
	UserNoSensetiveData,
} from '~shared/types/user.types';

const authService = new AuthService();

interface AuthStoreState {
	user: User | UserNoSensetiveData | null;

	loading: boolean;
	authError: string | null;
	login: (user: LoginUserType) => Promise<void>;
	register: (user: RegisterUserType) => Promise<void>;
	isLoggedIn: boolean;
	changePassword: (data: changePasswordType) => Promise<void>;
	logout: () => void;
	updateUser: (data: string) => Promise<void>;
	getCurrentUser: () => Promise<void>;
	resetPassword: (token: string, password: string) => Promise<void>;
	forgetPassword: (email: string) => Promise<void>;
	verifyEmail: (id: string) => void;
	resetError: () => void;
}

export const useAuthStore = create(
	persist<AuthStoreState>(
		(set) => ({
			user: null,
			loading: false,
			authError: null,
			isLoggedIn: !!localStorage.getItem(STORAGE_KEYS.TOKEN),
			resetError: (): void => set({ authError: null }),
			login: async (user: LoginUserType): Promise<void> => {
				set({ loading: true });
				try {
					const response = await authService.login(user);

					set({
						user: response.user,
						isLoggedIn: true,
						authError: null,
					});
				} catch (error) {
					if (error instanceof AxiosError) {
						set({
							authError: error.response?.data?.message,
						});
					} else {
						set({
							authError: error.message,
						});
					}
				} finally {
					set({ loading: false });
				}
			},
			register: async (user: RegisterUserType): Promise<void> => {
				set({ loading: true });
				try {
					const response = await authService.register(user);

					set({ user: response, authError: null });
				} catch (error) {
					if (error instanceof AxiosError) {
						set({
							authError: error.response?.data?.message,
						});
					} else {
						set({
							authError: error.message,
						});
					}
				} finally {
					set({ loading: false });
				}
			},
			changePassword: async (data: changePasswordType): Promise<void> => {
				set({ loading: true });
				try {
					await authService.changePassword(data);
					set({ authError: null });
				} catch (error) {
					if (error instanceof AxiosError) {
						set({
							authError: error.response?.data?.message,
						});
					} else {
						set({
							authError: error.message,
						});
					}
				} finally {
					set({ loading: false });
				}
			},
			logout: (): void => {
				localStorage.removeItem(STORAGE_KEYS.TOKEN);
				set({ user: null, isLoggedIn: false, authError: null });
			},
			updateUser: async (data: string): Promise<void> => {
				set({ loading: true });
				try {
					await authService.updateUser(data);
					set({ authError: null });
				} catch (error) {
					if (error instanceof AxiosError) {
						set({
							authError: error.response?.data?.message,
						});
					} else {
						set({
							authError: error.message,
						});
					}
				} finally {
					set({ loading: false });
				}
			},
			verifyEmail: async (id: string): Promise<void> => {
				set({ loading: true });
				try {
					await authService.confirmEmailVerification(id);
					set({ authError: null });
				} catch (error) {
					console.error('Failed to update User', error);
					set({ authError: error.message });
				} finally {
					set({ loading: false });
				}
			},
			getCurrentUser: async (): Promise<void> => {
				set({ loading: true, authError: null });
				try {
					const response = await authService.getCurrentUser();

					set({ user: response, isLoggedIn: true, authError: null });
				} catch (error) {
					if (error instanceof AxiosError) {
						set({
							authError: error.response?.data?.message,
						});
					} else {
						set({
							authError: error.message,
						});
					}
				} finally {
					set({ loading: false });
				}
			},

			resetPassword: async (
				token: string,
				password: string,
			): Promise<void> => {
				set({ loading: true });
				try {
					await authService.resetPassword(token, password);
					set({ authError: null });
				} catch (error) {
					if (error instanceof AxiosError) {
						set({
							authError: error.response?.data?.message,
						});
					} else {
						set({
							authError: error.message,
						});
					}
				} finally {
					set({ loading: false });
				}
			},
			forgetPassword: async (email: string): Promise<void> => {
				set({ loading: true });
				try {
					await authService.forgetPassword(email);
					set({ authError: null });
				} catch (error) {
					if (error instanceof AxiosError) {
						set({
							authError: error.response?.data?.message,
						});
					} else {
						set({
							authError: error.message,
						});
					}
				} finally {
					set({ loading: false });
				}
			},
		}),
		{
			name: STORAGE_KEYS.AUTH_PERSIST,
		},
	),
);
