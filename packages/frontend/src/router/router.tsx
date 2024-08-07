import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '~modules/app/app.module';
import { publicRoutes, privateRoutes } from './routes';
import { ROUTER_KEYS } from '~shared/keys';
import Loader from '~shared/components/loader/loader.component';
import AuthorizedLayout from '~modules/app/layouts/AuthorizedLayout';

const Router: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<App>
				<Suspense fallback={<Loader />}>
					<Routes>
						{publicRoutes.map((route, index) => (
							<Route
								key={`public-${index}`}
								path={route.path}
								element={route.element}
							/>
						))}
						<Route element={<AuthorizedLayout />}>
							{privateRoutes.map((route, index) => (
								<Route
									key={`private-${index}`}
									path={route.path}
									element={route.element}
								/>
							))}
						</Route>
						<Route
							path={ROUTER_KEYS.ALL_MATCH}
							element={
								<Navigate to={ROUTER_KEYS.LOGIN} replace />
							}
						/>
					</Routes>
				</Suspense>
			</App>
		</BrowserRouter>
	);
};

export default Router;
