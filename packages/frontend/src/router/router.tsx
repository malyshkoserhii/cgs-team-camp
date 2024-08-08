import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import App from '~modules/app/app.module';
import { publicRoutes } from './routes';
// import useAuthStore from '~store/authStore';

const AppRouter: React.FunctionComponent = () => {
	// const { isAuthenticated } = useAuthStore();

	return <Router>{publicRoutes}</Router>;
};

export default AppRouter;
