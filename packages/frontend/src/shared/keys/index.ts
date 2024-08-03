export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	LOGIN = '/login',
	DASHBOARD = '/dashboard',
	ADD_NEW = '/add',
	VIEW = '/view/:id',
}

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});

export const API_KEYS = {
	ALL: 'todos/all',
	CREATE: 'todos/create',
	BY_ID: (id: string): string => `todos/todo/${id}`,
};

const size = {
	mobile: 360,
	tablet: 768,
	laptop: 1024,
	desktop: 1440,
};

export const DEVICE = {
	// untilLaptop: `(max-width: ${size.laptop - 0.02}px)`,
	// untilTablet: `(max-width: ${size.tablet - 0.02}px)`,
	mobile: `(max-width: ${size.mobile}px)`,
	tablet: `(min-width: ${size.tablet}px)`,
	laptop: `(min-width: ${size.laptop}px)`,
	desktop: `(min-width: ${size.desktop}px)`,
};
