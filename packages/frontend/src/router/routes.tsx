import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '~/state/store/user.store';
import { ROUTER_KEYS } from '~shared/keys';

export const ProtectedRoutes: React.FunctionComponent = () => {
	const { data: user } = useUserStore();

	const navigate = useNavigate();

	if (!user) {
		navigate(ROUTER_KEYS.AUTH.LOGIN);
	}

	return <Outlet />;
};
