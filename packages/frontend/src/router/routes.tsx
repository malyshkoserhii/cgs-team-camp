import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import App from '~modules/app/app.module';
import { ROUTER_KEYS, STORAGE_KEYS } from '~shared/keys';
import LoginPage from '~shared/pages/auth/login.page';
import RegisterPage from '~shared/pages/auth/register.page';
import CreateTodo from '~shared/pages/createTodo/CreateTodo';
import EditTodoPage from '~shared/pages/editTodo/editTodoPage';
import FogetPasswordPage from '~shared/pages/fogetPassword/fogetPassword.page';
import ResetPasswordPage from '~shared/pages/resetPassword/resetPassword.page';
import UserProfile from '~shared/pages/user/userProgile';
import VerifyEmailPage from '~shared/pages/verifyEmail/verifyEmail.page';

const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

export const PublicRoute = ({
	redirectTo = ROUTER_KEYS.HOME,
}: {
	redirectTo?: string;
}): React.ReactNode => {
	return token ? <Navigate to={redirectTo} /> : <Outlet />;
};

export const PrivateRoute = ({
	redirectTo = ROUTER_KEYS.LOGIN,
}: {
	redirectTo?: string;
}): React.ReactNode => {
	return token ? <Outlet /> : <Navigate to={redirectTo} />;
};

export const routes = [
	{
		title: 'Home Page',
		path: ROUTER_KEYS.HOME,
		element: <App />,
		isPrivet: <PrivateRoute />,
	},
	{
		title: 'Dashboard',
		path: ROUTER_KEYS.DASHBOARD,
		element: <div>Dashboard Page</div>,
		isPrivet: <PrivateRoute />,
	},
	{
		title: 'Login',
		path: ROUTER_KEYS.LOGIN,
		element: <LoginPage />,
		isPrivet: <PublicRoute />,
	},
	{
		title: 'Register',
		path: ROUTER_KEYS.REGISTER,
		element: <RegisterPage />,
		isPrivet: <PublicRoute />,
	},
	{
		title: 'Add todo',
		path: ROUTER_KEYS.CREATETOD,
		element: <CreateTodo />,
		isPrivet: <PrivateRoute />,
	},
	{
		title: 'Edit todo',
		path: ROUTER_KEYS.EDITTODO,
		element: <EditTodoPage />,
		isPrivet: <PrivateRoute />,
	},
	{
		title: 'User Profile',
		path: ROUTER_KEYS.USER_PROFILE,
		element: <UserProfile />,
		isPrivet: <PrivateRoute />,
	},
	{
		title: 'Verify User Email',
		path: ROUTER_KEYS.VERIFY_EMAIL,
		element: <VerifyEmailPage />,
		isPrivet: <PrivateRoute />,
	},
	{
		title: 'Reset Password',
		path: ROUTER_KEYS.RESET_PASSWORD,
		element: <ResetPasswordPage />,
		isPrivet: <PublicRoute />,
	},
	{
		title: 'Foget Password',
		path: ROUTER_KEYS.FOGET_PASSWORD,
		element: <FogetPasswordPage />,
		isPrivet: <PublicRoute />,
	},
];
