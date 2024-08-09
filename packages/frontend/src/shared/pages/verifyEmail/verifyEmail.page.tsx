import { Card } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '~store/auth.store';

const VerifyEmailPage = (): React.ReactNode => {
	const { id } = useParams();

	const { verifyEmail } = useAuthStore();

	useEffect(() => {
		verifyEmail(id);
	}, [id]);

	return (
		<Card>
			<h2>Email Verified</h2>
		</Card>
	);
};

export default VerifyEmailPage;
