import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from '~shared/components/layout/dashboard.component';
import { routes } from './routes';
import NotFoundPage from '~shared/pages/notFoundPage/NotFoundPage';

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
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</DashboardLayout>
		</BrowserRouter>
	);
};

export default Router;
