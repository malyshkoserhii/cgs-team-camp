import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';

export const ProtectedRoutes: React.FunctionComponent = () => {
	const user = {};

	const navigate = useNavigate();

	if (!user) {
		navigate(ROUTER_KEYS.AUTH.LOGIN);
	}

	return <Outlet />;
};
