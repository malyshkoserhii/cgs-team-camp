import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '~store/auth.store';
import { ROUTER_KEYS } from '~shared/keys';

export const PublicRoutes: React.FC = () => {
	const { isAuth } = useAuthStore();

	return isAuth ? <Navigate to={ROUTER_KEYS.DASHBOARD} /> : <Outlet />;
};

export const PrivateRoutes: React.FC = () => {
	const { isAuth } = useAuthStore();

	return isAuth ? <Outlet /> : <Navigate to={ROUTER_KEYS.MAIN} />;
};
