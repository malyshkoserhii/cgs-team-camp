import { lazy } from 'react';

export const DashboardPage = lazy(
	() => import('./DashboardPage/DashboardPage'),
);
export const CreateTodoPage = lazy(
	() => import('./CreateTodoPage/CreateTodoPage'),
);
export const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
export const RegisterPage = lazy(() => import('./RegisterPage/RegisterPage'));
export const ActivatePage = lazy(() => import('./ActivatePage/ActivatePage'));
export const ProfilePage = lazy(() => import('./ProfilePage/ProfilePage'));

export { ErrorPage } from './ErrorPage/ErrorPage';
