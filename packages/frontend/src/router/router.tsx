import * as React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from 'react-router-dom';

import { TodosModule } from '~modules/todos/todos.module';
import { TodoForm } from '~modules/todos/TodoForm/TodoForm';
import App from '~modules/app/app.module';
import { ROUTER_KEYS } from '~shared/keys';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={ROUTER_KEYS.MAIN} element={<App />}>
			<Route path={ROUTER_KEYS.DASHBOARD} element={<TodosModule />} />
			<Route path={ROUTER_KEYS.ADD_NEW} element={<TodoForm />} />
			<Route path={`${ROUTER_KEYS.VIEW}`} element={<TodoForm />} />
			<Route path={`${ROUTER_KEYS.PROFILE}`} element={<h1>Profile</h1>} />
			<Route
				path={ROUTER_KEYS.ALL_MATCH}
				element={<Navigate to={ROUTER_KEYS.MAIN} replace />}
			/>
		</Route>,
	),
);

const Router: React.FunctionComponent = () => {
	return <RouterProvider router={router} />;
};

export default Router;
