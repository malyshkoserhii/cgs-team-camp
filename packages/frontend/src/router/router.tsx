import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePageContainer from '~/pages/home';
import { FinalForm } from '~shared/components/todo/todo-form/final-form';
import { ROUTER_KEYS } from '~shared/keys';

const MainRouter: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={<HomePageContainer />}
					path={ROUTER_KEYS.HOME}
				/>
				<Route
					element={<FinalForm type="ADD" />}
					path={ROUTER_KEYS.TODO.CREATE}
				/>
				<Route path="*" element={<Navigate to={ROUTER_KEYS.HOME} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default MainRouter;
