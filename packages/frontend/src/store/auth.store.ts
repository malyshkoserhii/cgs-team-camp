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
} from '~shared/types/User.types';

const authService = new AuthService();

interface AuthStoreState {
	user: User | UserNoSensetiveData | null;

	loading: boolean;
	error: AxiosError | null;
	login: (user: LoginUserType) => Promise<void>;
	register: (user: RegisterUserType) => Promise<void>;
	isLoggedIn: boolean;
	changePassword: (data: changePasswordType) => Promise<void>;
	logout: () => void;
	updateUser: (data: string) => Promise<void>;
	getCurrentUser: () => Promise<void>;
	resetPassword: (token: string, password: string) => Promise<void>;
	forgetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create(
	persist<AuthStoreState>(
		(set) => ({
			user: null,
			loading: false,
			error: null,
			isLoggedIn: !!localStorage.getItem(STORAGE_KEYS.TOKEN),
			login: async (user: LoginUserType): Promise<void> => {
				set({ loading: true });
				try {
					const response = await authService.login(user);

					set({ user: response.user, isLoggedIn: true });
				} catch (error) {
					console.error('Failed to login', error);
					set({ error: error.message });
				} finally {
					set({ loading: false });
				}
			},
			register: async (user: RegisterUserType): Promise<void> => {
				set({ loading: true });
				try {
					const response = await authService.register(user);

					set({ user: response });
				} catch (error) {
					console.error('Failed to register', error);
					set({ error: error.message });
				} finally {
					set({ loading: false });
				}
			},
			changePassword: async (data: changePasswordType): Promise<void> => {
				set({ loading: true });
				try {
					await authService.changePassword(data);
				} catch (error) {
					console.error('Failed to change password', error);
					set({ error: error.message });
				} finally {
					set({ loading: false });
				}
			},
			logout: (): void => {
				localStorage.removeItem(STORAGE_KEYS.TOKEN);
				set({ user: null, isLoggedIn: false });
			},
			updateUser: async (data: string): Promise<void> => {
				set({ loading: true });
				try {
					await authService.updateUser(data);
				} catch (error) {
					console.error('Failed to update User', error);
					set({ error: error.message });
				} finally {
					set({ loading: false });
				}
			},
			getCurrentUser: async (): Promise<void> => {
				set({ loading: true });
				try {
					const response = await authService.getCurrentUser();

					set({ user: response, isLoggedIn: true });
				} catch (error) {
					console.error('Error with User', error);
					set({ error: error.message });
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
				} catch (error) {
					console.error('Error with resetting password', error);
					set({ error: error.message });
				} finally {
					set({ loading: false });
				}
			},
			forgetPassword: async (email: string): Promise<void> => {
				set({ loading: true });
				try {
					await authService.forgetPassword(email);
				} catch (error) {
					console.error('Error request', error);
					set({ error: error.message });
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
