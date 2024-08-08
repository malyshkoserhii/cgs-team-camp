import { create } from 'zustand';
import authService from '~shared/components/auth/auth.service';
import { IUser } from '~shared/types/user/user.types';

export interface IUserStore {
	data: IUser;
	getUser: () => void;
	setUser: (user: IUser) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
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
}));
