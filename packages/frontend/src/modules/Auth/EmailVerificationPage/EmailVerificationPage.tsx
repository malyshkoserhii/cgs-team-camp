import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Loader from '~shared/components/loader/loader.component';
import { ROUTER_KEYS } from '~shared/keys/router-keys';
import { useAuthStore } from '~store/auth.store';

const EmailVerificationPage: React.FC = () => {
	const confirmEmailVerification = useAuthStore((state) => state.verifyEmail);
	const error = useAuthStore((state) => state.authError);
	const loading = useAuthStore((state) => state.loading);
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			confirmEmailVerification(id);
		}
	}, []);
	if (loading) return <Loader />;
	return (
		<div>
			{error ? (
				<p>
					<>{error}</>
				</p>
			) : (
				<>
					<p>Email Confirmed</p>
				</>
			)}

			<NavLink to={ROUTER_KEYS.LOGIN}>
				Now you can go to Login Page
			</NavLink>
		</div>
	);
};

export default EmailVerificationPage;
