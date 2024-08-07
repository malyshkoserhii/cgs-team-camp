import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, H3, Intent, Spinner } from '@blueprintjs/core';

import { useVerifyEmail } from '~/api/hooks/useUser';
import { ROUTER_KEYS } from '~shared/keys';

import { VerificationStatus } from '~typings/user';

const EmailVerification: FC = () => {
	const [verificationStatus, setVerificationStatus] =
		useState<VerificationStatus>(VerificationStatus.Loading);
	const location = useLocation();
	const navigate = useNavigate();
	const verifyEmailMutation = useVerifyEmail();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const token = searchParams.get('token');

		if (token) {
			verifyEmailMutation.mutate(token, {
				onSuccess: () => {
					setVerificationStatus(VerificationStatus.Success);
				},
				onError: () => {
					setVerificationStatus(VerificationStatus.Error);
				},
			});
		} else {
			setVerificationStatus(VerificationStatus.Error);
		}
	}, []);

	return (
		<Card>
			<H3>Email Verification</H3>
			{verificationStatus === 'loading' && (
				<>
					<Spinner intent={Intent.PRIMARY} />
					<p>Verifying your email...</p>
				</>
			)}
			{verificationStatus === 'success' && (
				<p>
					Your email has been successfully verified. Redirecting to
					login page...
				</p>
			)}
			{verificationStatus === 'error' && (
				<>
					<p>
						There was an error verifying your email. Please try
						again.
					</p>
					<Button onClick={() => navigate(ROUTER_KEYS.LOGIN)}>
						Go to login
					</Button>
				</>
			)}
		</Card>
	);
};

export default EmailVerification;
