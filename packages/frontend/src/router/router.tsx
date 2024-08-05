import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '~modules/app/app.module';
import { routes } from './routes';
import React from 'react';

const Router: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<App>
				<Routes>
					{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={route.element}
						/>
					))}
				</Routes>
			</App>
		</BrowserRouter>
	);
};

export default Router;
