import * as React from 'react';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

import TodoDashboardPage from '~modules/Todos/TodoDashboardPage/TodoDashboardPage';

import TodoPage from '~modules/Todos/TodoPage/TodoPage';

import Layout from '~shared/components/layout/layout';
import { ROUTER_KEYS } from '~shared/keys/router-keys';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<p>Home page</p>} />
			<Route
				path={ROUTER_KEYS.DASHBOARD}
				element={<TodoDashboardPage />}
			/>
			<Route
				path={`${ROUTER_KEYS.DASHBOARD}/:id`}
				element={<TodoPage />}
			/>

			<Route path="*" element={<p>Sorry, no page found</p>} />
		</Route>,
	),
);

const Router: React.FunctionComponent = () => {
	return <RouterProvider router={router} />;
};

export default Router;
