import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '~/store/auth.store';
import { ROUTER_KEYS } from '~shared/keys';

const PrivateRoute: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return isAuthenticated ? <Outlet /> : <Navigate to={ROUTER_KEYS.LOGIN} />;
};

export default PrivateRoute;
