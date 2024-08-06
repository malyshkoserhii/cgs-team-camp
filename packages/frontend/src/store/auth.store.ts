import { create } from 'zustand';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { User } from '~typings/user.types';
import { AuthService } from '~services/auth.service';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '~shared/keys';

const authService = new AuthService();

interface IUserStore {
	user: User;
	loading: boolean;
	error: AxiosError | null;
	register: (user: User) => Promise<void>;
	login: (user: User) => Promise<void>;
	forgetPassword: (email: User) => Promise<void>;
}

export const useAuthStore = create<IUserStore>()(
	persist(
		(set) => ({
			user: null,
			loading: false,
			error: null,
			// isLoggedIn: localStorage.getItem(STORAGE_KEYS.TOKEN),

			register: async (user: User): Promise<void> => {
				set({ loading: true });

				try {
					const { data } = await authService.registerUser(user);
					set({ user: data });
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
					set({ user: data });
				} catch (err) {
					toast.error(err.response?.data?.message);
				} finally {
					set({ loading: false });
				}
			},

			forgetPassword: async (email: User): Promise<void> => {
				set({ loading: true });

				try {
					await authService.forgetPassword(email);
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
