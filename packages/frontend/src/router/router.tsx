import * as React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { TodosModule } from '~modules/todos/todos.module';
import { TodoForm } from '~modules/todos/TodoForm/TodoForm';
import App from '~modules/app/app.module';
import { ROUTER_KEYS } from '~shared/keys';

const router = createBrowserRouter(
	createRoutesFromElements(
		// <Route path={'/'} element={<Layout />}>
		<Route path={'/'} element={<App />}>
			<Route path={ROUTER_KEYS.DASHBOARD} element={<TodosModule />} />
			<Route path={ROUTER_KEYS.ADD_NEW} element={<TodoForm />} />
			<Route path={`${ROUTER_KEYS.VIEW}`} element={<TodoForm />} />
		</Route>,
	),
);

const Router: React.FunctionComponent = () => {
	return <RouterProvider router={router} />;
};

export default Router;
