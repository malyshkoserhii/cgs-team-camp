import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/const/keys.const';
import { useAuth } from '~shared/hooks/useAuth.hook';

interface RequireAuthProps {
	children: ReactNode;
}

export function ProtectedRoute({
	children,
}: RequireAuthProps): ReactNode | null {
	const location = useLocation();
	const { shouldRedirect, isAuth } = useAuth();

	if (shouldRedirect) {
		return (
			<Navigate
				to={ROUTER_KEYS.DASHBOARD}
				state={{ from: location }}
				replace
			/>
		);
	}

	return isAuth ? children : null;
}
