import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from '~shared/components/Layout/Dashboard.component';
import { routes } from './routes';
import NotFoundPage from '~shared/pages/notFoundPage/NotFoundPage';
import { ROUTER_KEYS } from '~shared/keys';

const Router: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<DashboardLayout>
				<Routes>
					{routes.map((rout) => (
						<Route
							key={rout.path}
							path={ROUTER_KEYS.HOME}
							element={rout.isPrivet}
						>
							<Route
								key={rout.path}
								path={rout.path}
								element={rout.element}
							/>
						</Route>
					))}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</DashboardLayout>
		</BrowserRouter>
	);
};

export default Router;
