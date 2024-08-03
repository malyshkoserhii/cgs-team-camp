import * as React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
// import { Layout } from '~shared/components/Layout/Layout';
import { TodosModule } from '~modules/todos/todos.module';
import { TodoForm } from '~modules/todos/TodoForm/TodoForm';
import App from '~modules/app/app.module';

const router = createBrowserRouter(
	createRoutesFromElements(
		// <Route path={'/'} element={<Layout />}>
		<Route path={'/'} element={<App />}>
			<Route index element={<TodosModule />} />
			<Route path={'/add'} element={<TodoForm />} />
			<Route path={'/view/:id'} element={<TodoForm />} />
		</Route>,
	),
);

const Router: React.FunctionComponent = () => {
	return <RouterProvider router={router} />;
};

export default Router;
