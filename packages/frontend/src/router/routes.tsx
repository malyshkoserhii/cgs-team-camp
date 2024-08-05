// import * as React from 'react';

// export const publicRoutes = <>// PUBLIC_ROUTES</>;

// export const privateRoutes = <>// PRIVATE_ROUTES</>;

import React from 'react';
import { EditTodoForm } from '~modules/app/pages/EditTodoPage/EditTodoPage';
import { NewTodoPage } from '~modules/app/pages/NewTodoPage/NewTodoPage';
import { TodosPage } from '~modules/app/pages/TodosPage/TodosPage';
import { ROUTER_KEYS } from '~shared/keys';

export const routes = [
	{
		path: ROUTER_KEYS.ALL_MATCH,
		element: <div>Home Page</div>,
	},
	{
		path: ROUTER_KEYS.TODO,
		element: <TodosPage />,
	},
	{
		path: ROUTER_KEYS.NEW,
		element: <NewTodoPage />,
	},
	{
		path: ROUTER_KEYS.EDIT,
		element: <EditTodoForm />,
	},
];
