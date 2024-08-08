import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePageContainer from '~/pages/home';
import { FinalForm } from '~shared/components/todo/todo-form/final-form';
import { ROUTER_KEYS } from '~shared/keys';
import { ProtectedRoutes } from './routes';
import { AuthForm } from '~shared/components/auth/form';
import ReqResetPassPageContainer from '~/pages/auth/req-reset-password';
import ResetPassPageContainer from '~/pages/auth/reset-password';

const MainRouter: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route
						element={<HomePageContainer />}
						path={ROUTER_KEYS.HOME}
					/>
					<Route
						element={<FinalForm type="ADD" />}
						path={ROUTER_KEYS.TODO.CREATE}
					/>
				</Route>
				<Route
					path={ROUTER_KEYS.AUTH.LOGIN}
					element={<AuthForm type="login" />}
				/>
				<Route
					path={ROUTER_KEYS.AUTH.SIGN_UP}
					element={<AuthForm type="register" />}
				/>
				<Route
					element={<ReqResetPassPageContainer />}
					path={ROUTER_KEYS.AUTH.REQ_RESET_PASSWORD}
				/>
				<Route
					element={<ResetPassPageContainer />}
					path={ROUTER_KEYS.AUTH.RESET_PASSWORD}
				/>
				<Route path="*" element={<Navigate to={ROUTER_KEYS.HOME} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default MainRouter;
