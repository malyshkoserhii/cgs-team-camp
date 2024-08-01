import { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { AuthPage, CreateTodoPage, DashboardPage } from '~/pages';
import { ROUTER_KEYS } from '~shared/const/keys.const';

export enum AppRoutes {
	MAIN = 'dashboard',
	CREATE_TODO = 'create-todo',
	AUTH = 'auth',
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
		auth: false, // need to edit
	},
	[AppRoutes.AUTH]: {
		path: ROUTER_KEYS.AUTH,
		element: <AuthPage />,
	},
};
