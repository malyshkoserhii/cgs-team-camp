import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
	children: ReactNode;
	hasAccess: boolean;
}

export function ProtectedRoute({
	children,
	hasAccess,
}: RequireAuthProps): ReactNode | null {
	const location = useLocation();

	if (!hasAccess) {
		return <Navigate to="/test" state={{ from: location }} replace />;
	}

	return hasAccess ? children : null;
}
