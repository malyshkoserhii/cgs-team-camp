import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoPage from '~modules/todo/pages/TodoMainPage/TodoMainPage';

export const publicRoutes = (
	<Routes>
		<Route path="/" element={<TodoPage />} />
	</Routes>
);

export const privateRoutes = <Routes></Routes>;
