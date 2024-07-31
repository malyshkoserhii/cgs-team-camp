import { lazy } from 'react';

export const DashboardPage = lazy(
	() => import('./DashboardPage/DashboardPage'),
);
export { ErrorPage } from './ErrorPage/ErrorPage';
