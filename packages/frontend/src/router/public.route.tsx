import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '~/store/auth.store';
import { ROUTER_KEYS } from '~/shared/keys';

const PublicRoute: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return isAuthenticated ? (
		<Navigate to={ROUTER_KEYS.DASHBOARD} />
	) : (
		<Outlet />
	);
};

export default PublicRoute;
