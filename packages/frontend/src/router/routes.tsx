import React from 'react';
import { Route } from 'react-router-dom';

import { ROUTER_KEYS } from '~shared/keys';
import Layout from '~shared/layout/layout';
import Dashboard from '~/views/dashboard/dashboard.view';
import TodoDetails from '~/views/todo/todo-details.view';
import Login from '~/views/login/login.view';
import Register from '~/views/register/register.view';
import EmailVerification from '~/views/email-verification/email-verification.view';
import Profile from '~/views/profile/profile.view';
import ForgotPassword from '~/views/forgot-password/forgot-password.view';
import ResetPassword from '~/views/reset-password/reset-password.view';

export const publicRoutes = (
	<>
		<Route path={ROUTER_KEYS.LOGIN} element={<Login />} />
		<Route path={ROUTER_KEYS.REGISTER} element={<Register />} />
		<Route
			path={ROUTER_KEYS.FORGOT_PASSWORD}
			element={<ForgotPassword />}
		/>

		<Route
			path={ROUTER_KEYS.VERIFY_EMAIL}
			element={<EmailVerification />}
		/>
		<Route path={ROUTER_KEYS.RESET_PASSWORD} element={<ResetPassword />} />
	</>
);

export const privateRoutes = (
	<Route element={<Layout />}>
		<Route path={ROUTER_KEYS.DASHBOARD} element={<Dashboard />} />
		<Route path={ROUTER_KEYS.TODO + '/:id'} element={<TodoDetails />} />
		<Route path={ROUTER_KEYS.PROFILE} element={<Profile />} />
	</Route>
);
