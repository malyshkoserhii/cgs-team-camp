import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from '~shared/components/layout/Dashboard.component';
import { routes } from './routes';

const Router: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<DashboardLayout>
				<Routes>
					{routes.map((rout) => (
						<Route
							key={rout.path}
							path={rout.path}
							element={rout.element}
						/>
					))}
				</Routes>
			</DashboardLayout>
		</BrowserRouter>
		// Implement Routes
	);
};

export default Router;
