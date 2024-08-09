import { ROUTER_KEYS } from '~shared/keys';

export const menuConfig = [
	{
		title: 'Home Page',
		path: ROUTER_KEYS.HOME,
	},
	{
		title: 'Dashboard',
		path: ROUTER_KEYS.DASHBOARD,
	},
	{
		title: 'Add todo',
		path: ROUTER_KEYS.CREATETOD,
	},
];

export const publicMenuConfig = [
	{
		title: 'Login',
		path: ROUTER_KEYS.LOGIN,
	},
	{
		title: 'Register',
		path: ROUTER_KEYS.REGISTER,
	},
];
