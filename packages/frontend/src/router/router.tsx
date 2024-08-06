import * as React from 'react';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import HomePage from '~modules/app/app.module';
import ChangePassword from '~modules/Auth/ChangePasswordPage/ChangePasswordPage';
import EmailVerificationPage from '~modules/Auth/EmailVerificationPage/EmailVerificationPage';
import LoginPage from '~modules/Auth/LoginPage/LoginPage';
import RegisterPage from '~modules/Auth/RegisterPage/RegisterPage';
import ResetPasswordPage from '~modules/Auth/ResetPasswordPage/ResetPasswordPage';
import TodoDashboardPage from '~modules/Todos/TodoDashboardPage/TodoDashboardPage';
import TodoPage from '~modules/Todos/TodoPage/TodoPage';
import Layout from '~shared/components/layout/layout';
import { ROUTER_KEYS } from '~shared/keys/router-keys';
import { useAuthStore } from '~store/auth.store';
import { PrivateRoute, PublicRoute } from './routes';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<HomePage />} />
			<Route
				path={ROUTER_KEYS.DASHBOARD}
				element={<PrivateRoute element={<TodoDashboardPage />} />}
			/>
			<Route
				path={`${ROUTER_KEYS.DASHBOARD}/:id`}
				element={<PrivateRoute element={<TodoPage />} />}
			/>
			<Route
				path={ROUTER_KEYS.LOGIN}
				element={
					<PublicRoute
						element={<LoginPage />}
						redirectPath={ROUTER_KEYS.DASHBOARD}
					/>
				}
			/>
			<Route
				path={ROUTER_KEYS.VERIFY_EMAIL}
				element={<PublicRoute element={<EmailVerificationPage />} />}
			/>
			<Route
				path={ROUTER_KEYS.REGISTER}
				element={
					<PublicRoute
						element={<RegisterPage />}
						redirectPath={ROUTER_KEYS.DASHBOARD}
					/>
				}
			/>
			<Route
				path={ROUTER_KEYS.CHANGE_PASSWORD}
				element={<PrivateRoute element={<ChangePassword />} />}
			/>
			<Route
				path={ROUTER_KEYS.RESET_PASSWORD}
				element={<PublicRoute element={<ResetPasswordPage />} />}
			/>

			<Route path="*" element={<p>Sorry, no page found</p>} />
		</Route>,
	),
);

const Router: React.FunctionComponent = () => {
	const authStore = useAuthStore();
	React.useEffect(() => {
		authStore.getCurrentUser();
	}, []);

	return <RouterProvider router={router} />;
};

export default Router;
