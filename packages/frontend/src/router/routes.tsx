import * as React from 'react';
import App from '~modules/app/app.module';
import { ROUTER_KEYS } from '~shared/keys';
import CreateTodo from '~shared/pages/createTodo/CreateTodo';
import EditTodoPage from '~shared/pages/editTodo/editTodoPage';

export const publicRoutes = <>// PUBLIC_ROUTES</>;

export const privateRoutes = <>// PRIVATE_ROUTES</>;

export const routes = [
	{
		title: 'Home Page',
		path: ROUTER_KEYS.ALL_MATCH,
		element: <App />,
	},
	{
		title: 'Dashboard',
		path: ROUTER_KEYS.DASHBOARD,
		element: <div>Dashboard Page</div>,
	},
	{
		title: 'Login',
		path: ROUTER_KEYS.LOGIN,
		element: <div>Login Page</div>,
	},
	{
		title: 'Register',
		path: ROUTER_KEYS.REGISTER,
		element: <div>Register Page</div>,
	},
	{
		title: 'Add todo',
		path: ROUTER_KEYS.CREATETOD,
		element: <CreateTodo />,
	},
	{
		title: 'Edit todo',
		path: ROUTER_KEYS.EDITTODO,
		element: <EditTodoPage />,
	},
];
