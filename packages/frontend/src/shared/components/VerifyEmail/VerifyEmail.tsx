import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { authService } from '~services/auth.service';
import { Loader, StyledNavLink } from '~shared/components';
import { ROUTER_KEYS } from '~shared/keys';
import { useAuthStore } from '~store/auth.store';

export const VerifyEmail: React.FC = () => {
	const navigate = useNavigate();
	const { token } = useParams();
	const { loading } = useAuthStore();

	useEffect(() => {
		const verifyEmailToken = async (): Promise<void> => {
			if (token) {
				try {
					const { data } = await authService.verifyEmail(token);
					toast.success(data.message);
				} catch (err) {
					toast.error(
						err.response?.data?.message || 'Verification failed',
					);
				} finally {
					navigate(ROUTER_KEYS.MAIN);
				}
			}
		};

		verifyEmailToken();
	}, [token, navigate]);

	if (loading) return <Loader loading={loading} />;

	return (
		<StyledNavLink to={ROUTER_KEYS.LOGIN}>
			Verification email is successfully. Please Login now
		</StyledNavLink>
	);
};
