import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthService } from '~services/auth.service';

const { verifyEmail } = new AuthService();

export const VerifyEmail: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const token = new URLSearchParams(location.search).get('token');

	useEffect(() => {
		console.log('start useEffect');
		console.log('token params', token);

		const verifyEmailToken = async (): Promise<void> => {
			if (token) {
				try {
					console.log('verifyEmailToken token:', token);
					const response = await verifyEmail(token);
					console.log('verifyEmailToken response:', response);
					// toast.success(response?.data?.message);
				} catch (err) {
					toast.error(
						err.response?.data?.message || 'Verification failed',
					);
				} finally {
					// navigate(ROUTER_KEYS.MAIN);
				}
			}
		};

		verifyEmailToken();
		console.log('end useEffect');
	}, [token, navigate]);

	return <></>;
};
