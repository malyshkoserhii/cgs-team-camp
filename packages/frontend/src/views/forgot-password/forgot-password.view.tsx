import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import ForgotPasswordForm from '~shared/forms/user/forgot-password/forgot-password.form';
import { ROUTER_KEYS } from '~shared/keys';

import { forgotPasswordWrapper } from './forgot-password.styles';

const ForgotPassword: FC = () => {
	return (
		<div className={forgotPasswordWrapper}>
			<h1>Forgot Password</h1>
			<ForgotPasswordForm />
			<p>
				Remember your password?
				<Link to={ROUTER_KEYS.LOGIN}>Login here</Link>
			</p>
		</div>
	);
};

export default ForgotPassword;
