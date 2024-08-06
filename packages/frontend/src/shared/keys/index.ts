export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	REGISTER = '/register',
	FORGET_PSW = '/forget-password',
	RESET_PSW = '/reset-password/:token',
	DASHBOARD = '/dashboard',
	VERIFY_EMAIL = '/verify-email/:token',
	ADD_NEW = '/add',
	VIEW = '/view/:id',
	PROFILE = '/profile',
	MAIN = '/',
}

export const enum FILTER_KEYS {
	ALL = 'All',
	COMPLETED = 'Completed',
	PRIVATE = 'Private',
	PUBLIC = 'Public',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
	AUTH_PERSIST: 'AUTH_PERSIST',
});

export const API_KEYS = {
	ALL: 'todos/all',
	CREATE: 'todos/create',
	BY_ID: (id: string): string => `todos/todo/${id}`,
	REGISTER: 'auth/register',
	LOGIN: 'auth/login',
	FORGOT_PSW: 'auth/forgot-password',
	VERIFY_EMAIL: 'auth/verify-email',
	RESET_PSW: 'auth/reset-password',
};

const size = {
	mobile: 360,
	tablet: 768,
	laptop: 1024,
	desktop: 1440,
};

export const DEVICE = {
	mobile: `(min-width: ${size.mobile}px)`,
	untilTablet: `(max-width: ${size.tablet - 0.02}px)`,
	tablet: `(min-width: ${size.tablet}px) and (max-width: ${size.laptop - 0.02}px)`,
	laptop: `(min-width: ${size.laptop}px)`,
	desktop: `(min-width: ${size.desktop}px)`,
};
