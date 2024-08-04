import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ROUTER_KEYS } from '~shared/keys';
import Layout from '~shared/layout/layout';
import Dashboard from '~/views/dashboard/dashboard.view';
import TodoDetails from '~/views/todo/todo-details.view';

const Router: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTER_KEYS.LOGIN} element={<h1>login</h1>} />
				<Route path={ROUTER_KEYS.REGISTER} element={<h1>sign up</h1>} />
				<Route
					path={ROUTER_KEYS.RESET_PASSWORD}
					element={<h1>Reset password</h1>}
				/>

				<Route element={<Layout />}>
					<Route
						path={ROUTER_KEYS.DASHBOARD}
						element={<Dashboard />}
					/>
					<Route
						path={ROUTER_KEYS.TODO + '/:id'}
						element={<TodoDetails />}
					/>
				</Route>

				<Route
					path={ROUTER_KEYS.ALL_MATCH}
					element={<Navigate to={ROUTER_KEYS.DASHBOARD} />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
