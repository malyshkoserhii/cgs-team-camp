import { create } from 'zustand';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { User } from '~typings/user.types';
import { AuthService } from '~services/auth.service';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '~shared/keys';

const authService = new AuthService();

interface IUserStore {
	user: User | null;
	loading: boolean;
	error: AxiosError | null;
	register: (user: User) => Promise<void>;
	login: (user: User) => Promise<void>;
	logout: () => Promise<void>;
	forgetPassword: (email: User) => Promise<void>;
	resetPassword: (password: string, token: string) => Promise<void>;
	isAuth: boolean;
}

export const useAuthStore = create<IUserStore>()(
	persist(
		(set) => ({
			user: null,
			loading: false,
			error: null,
			isAuth: false,

			register: async (user: User): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await authService.registerUser(user);
					toast.success(data?.message);
				} catch (err) {
					toast.error(err.response?.data?.message);
				} finally {
					set({ loading: false });
				}
			},

			login: async (user: User): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await authService.loginUser(user);
					set({ user: data, isAuth: true });
				} catch (err) {
					toast.error(err.response?.data?.message);
				} finally {
					set({ loading: false });
				}
			},

			logout: async (): Promise<void> => {
				try {
					localStorage.removeItem(STORAGE_KEYS.TOKEN);
					set({ isAuth: false, user: null });
					toast.success('Successful logout');
				} catch (err) {
					toast.error(err.response?.data?.message);
				} finally {
					set({ loading: false });
				}
			},

			forgetPassword: async (email: User): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await authService.forgetPassword(email);
					toast.success(data?.message);
				} catch (err) {
					toast.error(err.response?.data?.message);
				} finally {
					set({ loading: false });
				}
			},

			resetPassword: async (
				password: string,
				token: string,
			): Promise<void> => {
				set({ loading: true });
				try {
					const { data } = await authService.resetPassword(
						password,
						token,
					);
					toast.success(data?.message);
				} catch (err) {
					toast.error(err.response?.data?.message);
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
