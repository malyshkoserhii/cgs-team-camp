import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTER_KEYS } from '../shared/keys/';
import DashboardPage from '../modules/dashboard/dashboard.module';
import TodoPage from '../modules/todos/todo.module';

export const publicRoutes = (
	<Routes>
		{/*<Route path={ROUTER_KEYS.LOGIN} element={<LoginPage />} />*/}
		<Route path={ROUTER_KEYS.DASHBOARD} element={<DashboardPage />} />
		<Route path={ROUTER_KEYS.TODO} element={<TodoPage />} />
		<Route path="*" element={<Navigate to="/dashboard" />} />
		<Route path="/" element={<Navigate to="/dashboard" />} />
	</Routes>
);

// export const privateRoutes = (
// 	<Routes>
// 		<Route path={ROUTER_KEYS.DASHBOARD} element={<DashboardPage />} />
// 		<Route path={ROUTER_KEYS.TODO} element={<TodoPage />} />
// 	</Routes>
// );
