import { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import {
	ActivatePage,
	CreateTodoPage,
	DashboardPage,
	LoginPage,
	RegisterPage,
} from '~/pages';
import ResetPasswordConfirmPage from '~/pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage';
import ResetPasswordPage from '~/pages/ResetPasswordPage/ResetPasswordPage';
import { ROUTER_KEYS } from '~shared/const/keys.const';

export enum AppRoutes {
	MAIN = 'dashboard',
	CREATE_TODO = 'create-todo',
	LOGIN = 'login',
	REGISTER = 'register',
	ACTIVATE_ACCOUNT = 'activate',
	CHANGE_PASSWORD = 'change-password',
	CHANGE_PASSWORD_CONFIRM = 'change-password-confirm',
}

export type AppRoutesProps = Omit<RouteProps, 'children'> & {
	auth?: boolean;
	children?: {
		index?: boolean;
		path: string;
		element?: ReactNode;
		breadcrumbName?: string;
	}[];
	breadcrumbName?: string;
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: ROUTER_KEYS.DASHBOARD,
		element: <DashboardPage />,
	},
	[AppRoutes.CREATE_TODO]: {
		path: ROUTER_KEYS.CREATE_TODO,
		element: <CreateTodoPage />,
		auth: true,
	},
	[AppRoutes.LOGIN]: {
		path: ROUTER_KEYS.LOGIN,
		element: <LoginPage />,
	},
	[AppRoutes.REGISTER]: {
		path: ROUTER_KEYS.REGISTER,
		element: <RegisterPage />,
	},
	[AppRoutes.ACTIVATE_ACCOUNT]: {
		path: ROUTER_KEYS.ACTIVATE_ACCOUNT,
		element: <ActivatePage />,
	},
	[AppRoutes.CHANGE_PASSWORD]: {
		path: ROUTER_KEYS.CHANGE_PASSWORD,
		element: <ResetPasswordPage />,
	},
	[AppRoutes.CHANGE_PASSWORD_CONFIRM]: {
		path: ROUTER_KEYS.CHANGE_PASSWORD_CONFIRM,
		element: <ResetPasswordConfirmPage />,
	},
};
