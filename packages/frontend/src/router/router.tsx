import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '~modules/app/app.module';
import DashboardLayout from '~shared/components/Layout/Dashboard.component';
import { ROUTER_KEYS } from '~shared/keys';

const Router: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DashboardLayout />}>
					<Route path={ROUTER_KEYS.DASHBOARD} element={<App />} />
					<Route path="/test" element={<div>Test Router</div>} />
				</Route>
				<Route path={ROUTER_KEYS.LOGIN} element={<div>Login</div>} />
				<Route
					path={ROUTER_KEYS.REGISTER}
					element={<div>Register</div>}
				/>
			</Routes>
		</BrowserRouter>
		// Implement Routes
	);
};

export default Router;
