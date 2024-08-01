import { lazy } from 'react';

export const DashboardPage = lazy(
	() => import('./DashboardPage/DashboardPage'),
);
export const CreateTodoPage = lazy(
	() => import('./CreateTodoPage/CreateTodoPage'),
);
export { ErrorPage } from './ErrorPage/ErrorPage';
