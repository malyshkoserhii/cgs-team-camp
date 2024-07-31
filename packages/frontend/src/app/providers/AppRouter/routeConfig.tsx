import { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { DashboardPage } from '~/pages';
import { ROUTER_KEYS } from '~shared/const/keys.const';

export enum AppRoutes {
	MAIN = 'dashboard',
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
};
