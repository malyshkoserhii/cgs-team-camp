import { ReactElement, ReactNode, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from '~shared/ui/loader';
import { ProtectedRoute } from './ProtectedRoute';
import { AppRoutesProps, routeConfig } from './routeConfig';

export const AppRouter = (): ReactElement => {
	const renderRouteElement = (route: AppRoutesProps): ReactElement => (
		<Route
			key={route.path}
			path={route.path}
			element={
				<Suspense fallback={<Loader fullHeight />}>
					{route.auth ? (
						<ProtectedRoute>{route.element}</ProtectedRoute>
					) : (
						route.element
					)}
				</Suspense>
			}
		>
			{route.children && (
				<Route>
					{renderRoutesRecursive(route.children as AppRoutesProps)}
				</Route>
			)}
		</Route>
	);

	const renderRoutesRecursive = (routes: AppRoutesProps): ReactNode => {
		if (Array.isArray(routes)) {
			return routes.map((route) => renderRouteElement(route));
		} else {
			return renderRouteElement(routes);
		}
	};

	return (
		<Routes>
			{Object.values(routeConfig).map((route) =>
				renderRoutesRecursive(route),
			)}
		</Routes>
	);
};
