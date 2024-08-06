import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '~/services/auth.service';

interface AuthState {
	isAuthenticated: boolean;
	userId: string | null;
	checkAuth: () => void;
	setUserId: (id: string) => void;
	clearAuth: () => void;
}

const authService = new AuthService();

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: authService.isAuthenticated(),
			userId: null,
			checkAuth: () =>
				set({ isAuthenticated: authService.isAuthenticated() }),
			setUserId: (id: string) =>
				set({ userId: id, isAuthenticated: true }),
			clearAuth: () => set({ isAuthenticated: false, userId: null }),
		}),
		{
			name: 'auth-storage',
			getStorage: () => localStorage,
		},
	),
);
