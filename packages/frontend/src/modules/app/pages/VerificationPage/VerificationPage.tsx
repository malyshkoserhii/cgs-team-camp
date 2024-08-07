import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { useUserStore } from '~store/user.store';
import { Button } from '@blueprintjs/core';

export const VerificationPage: React.FC = () => {
	const { token } = useParams<{ token: string }>();
	const navigate = useNavigate();
	const { verifyUser, error, isLoading } = useUserStore();
	const [message, setMessage] = useState<string>('Verifying your email...');

	useEffect(() => {
		const verifyEmail = async (): Promise<void> => {
			if (token) {
				try {
					const result = await verifyUser(token);
					setMessage(result || 'Email verified successfully!');
				} catch (err) {
					setMessage('Failed to verify email. Please try again.');
				}
			} else {
				setMessage('Invalid verification link.');
			}
		};

		verifyEmail();
	}, [token, verifyUser]);

	const goToLogin = (): void => {
		navigate(ROUTER_KEYS.LOGIN);
	};

	return (
		<div style={{ textAlign: 'center', padding: '20px' }}>
			<h1>Email Verification</h1>
			{isLoading ? (
				<p>Verifying your email...</p>
			) : (
				<>
					<p>{message}</p>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<Button onClick={goToLogin} disabled={isLoading}>
						Go to Login
					</Button>
				</>
			)}
		</div>
	);
};
