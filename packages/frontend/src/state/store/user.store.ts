import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '~shared/components/auth/auth.service';
import { IUser } from '~shared/types/user/user.types';

export interface IUserStore {
	data: IUser | null;
	getUser: () => Promise<void>;
	setUser: (user: IUser) => Promise<void>;
}

export const useUserStore = create(
	persist<IUserStore>(
		(set) => ({
			data: null,

			async getUser(): Promise<void> {
				const user = await authService.getUser();

				set({
					data: user,
				});
			},

			async setUser(user: IUser): Promise<void> {
				set({
					data: user,
				});
			},
		}),
		{
			name: 'user-store',
			partialize: (state) => state,
		},
	),
);
