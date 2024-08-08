import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS } from '~shared/keys';
import { userService } from '~shared/services/user.service';
import { User } from '~shared/types/user.type';

interface UserState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
	getUser: () => Promise<void>;
	verifyUser: (token: string) => Promise<string>;
	logIn: (user: Partial<User>) => Promise<void>;
	signUp: (user: Partial<User>) => Promise<string>;
	changePassword: (
		currentPassword: string,
		newPassword: string,
	) => Promise<string>;
	forgotPassword: (email: string) => Promise<string>;
	resetPassword: (token: string, newPassword: string) => Promise<string>;
	editProfile: (changes: { name: string }) => Promise<string>;
	logOut: () => Promise<string>;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			isLoading: false,
			error: null,
			getUser: async (): Promise<void> => {
				set({ isLoading: true });
				try {
					const user = await userService.getUser();
					set({ user, isLoading: false });
				} catch (error) {
					set({ error: 'Failed to fetch user', isLoading: false });
				}
			},
			verifyUser: async (token): Promise<string> => {
				try {
					const { message } = await userService.verifyUser(token);
					return message;
				} catch (error) {
					set({ error: 'Failed to verify user' });
					throw error;
				}
			},
			logIn: async (user): Promise<void> => {
				try {
					const { accessToken, refreshToken } =
						await userService.logIn(user);
					localStorage.setItem(
						STORAGE_KEYS.ACCESS_TOKEN,
						accessToken,
					);
					localStorage.setItem(
						STORAGE_KEYS.REFRESH_TOKEN,
						refreshToken,
					);
					const userData = await userService.getUser();
					set({ user: userData, error: null });
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Failed to log in',
					});
					throw error;
				}
			},
			signUp: async (user): Promise<string> => {
				try {
					const { message } = await userService.signUp(user);
					return message;
				} catch (error) {
					set({ error: 'Failed to sign up' });
					throw error;
				}
			},
			changePassword: async (
				currentPassword,
				newPassword,
			): Promise<string> => {
				try {
					const { message } = await userService.changePassword(
						currentPassword,
						newPassword,
					);
					return message;
				} catch (error) {
					set({ error: 'Failed to change password' });
					throw error;
				}
			},
			forgotPassword: async (email): Promise<string> => {
				try {
					const { message } = await userService.forgotPassword(email);
					return message;
				} catch (error) {
					set({ error: 'Failed to process forgot password request' });
					throw error;
				}
			},
			resetPassword: async (token, newPassword): Promise<string> => {
				try {
					const { message } = await userService.resetPassword(
						token,
						newPassword,
					);
					return message;
				} catch (error) {
					set({ error: 'Failed to reset password' });
					throw error;
				}
			},
			editProfile: async (changes): Promise<string> => {
				try {
					const { message } = await userService.editProfile(changes);
					set((state) => ({ user: { ...state.user, ...changes } }));
					return message;
				} catch (error) {
					set({ error: 'Failed to edit profile' });
					throw error;
				}
			},
			logOut: async (): Promise<string> => {
				try {
					const { message } = await userService.logOut();
					localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
					localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
					set({ user: null });
					return message;
				} catch (error) {
					set({ error: 'Failed to log out' });
					throw error;
				}
			},
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ user: state.user }),
		},
	),
);
