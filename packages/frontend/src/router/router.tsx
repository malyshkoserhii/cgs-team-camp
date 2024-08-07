import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ROUTER_KEYS } from '~shared/keys';
import PrivateRoute from './private.route';
import PublicRoute from './public.route';
import { publicRoutes, privateRoutes } from './routes';

const Router: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PublicRoute />}>{publicRoutes}</Route>

				<Route element={<PrivateRoute />}>{privateRoutes}</Route>

				<Route
					path={ROUTER_KEYS.ALL_MATCH}
					element={<Navigate to={ROUTER_KEYS.DASHBOARD} />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
