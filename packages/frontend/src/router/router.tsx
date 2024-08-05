import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddTodoPage from '~modules/todo/pages/AddTodoPage';
import EditTodoPage from '~modules/todo/pages/EditTodoPage';
import TodoPage from '~modules/todo/pages/TodoMainPage/TodoMainPage';
import TodoDetailPage from '~modules/todo/pages/TodoDetailPage';
import { ROUTER_KEYS } from '~shared/keys/router-keys';

const RouterComponent: React.FC = () => {
	console.log('Router component rendered');
	return (
		<Routes>
			<Route path={ROUTER_KEYS.DASHBOARD} element={<TodoPage />} />
			<Route path={ROUTER_KEYS.ADD_TODO} element={<AddTodoPage />} />
			<Route
				path={`${ROUTER_KEYS.EDIT_TODO}/:id`}
				element={<EditTodoPage />}
			/>
			<Route
				path={`${ROUTER_KEYS.TODO}/:id`}
				element={<TodoDetailPage />}
			/>
		</Routes>
	);
};

export default RouterComponent;
