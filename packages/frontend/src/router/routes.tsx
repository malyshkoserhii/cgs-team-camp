import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys/router-keys';
import { useAuthStore } from '~store/auth.store';

export const PrivateRoute = ({ element }): React.ReactNode => {
	const { isLoggedIn } = useAuthStore();
	const location = useLocation();

	return isLoggedIn ? (
		element
	) : (
		<Navigate to={ROUTER_KEYS.LOGIN} state={{ from: location }} />
	);
};
export const PublicRoute = ({
	element,
	redirectPath = '/',
}): React.ReactNode => {
	const { isLoggedIn } = useAuthStore();

	return isLoggedIn ? <Navigate to={redirectPath} /> : element;
};
