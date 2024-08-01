import { lazy } from 'react';

export const DashboardPage = lazy(
	() => import('./DashboardPage/DashboardPage'),
);
export const CreateTodoPage = lazy(
	() => import('./CreateTodoPage/CreateTodoPage'),
);
export const AuthPage = lazy(() => import('./AuthPage/AuthPage'));
export { ErrorPage } from './ErrorPage/ErrorPage';
