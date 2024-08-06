import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import ResetPasswordForm from '~/shared/forms/user/reset-password/reset-password.form';
import { ROUTER_KEYS } from '~shared/keys';

import { resetPasswordWrapper } from './reset-password.styles';

const ResetPassword: React.FC = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get('token');
	const navigate = useNavigate();

	if (!token) {
		navigate(ROUTER_KEYS.LOGIN);
		return null;
	}

	return (
		<div className={resetPasswordWrapper}>
			<h1>Reset Password</h1>
			<ResetPasswordForm resetToken={token} />
		</div>
	);
};

export default ResetPassword;
