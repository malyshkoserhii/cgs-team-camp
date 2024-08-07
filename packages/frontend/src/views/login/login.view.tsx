import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useLogin, useResendVerification } from '~/api/hooks/useUser';
import LoginForm from '~shared/forms/user/login/login.form';
import ResendVerificationForm from '~shared/forms/user/resend-verification/resend-verification.form';
import { showToast } from '~/utils/showToast';
import { useAuthStore } from '~store/auth.store';
import { ROUTER_KEYS } from '~shared/keys';

import { loginWrapper } from './login.styles';

import type { EmailInput, LoginInput } from '~typings/user';

const Login = () => {
	const { mutateAsync: login } = useLogin();
	const { mutateAsync: resendVerification } = useResendVerification();
	const { setUserId, checkAuth } = useAuthStore();

	const handleLogin = useCallback(
		async (values: LoginInput) => {
			const response = await login(values);
			setUserId(response.userId);
			checkAuth();
		},
		[login],
	);

	const handlResendVerification = useCallback(
		async (values: EmailInput) => {
			await resendVerification(values.email);
			showToast('Verification email sent');
		},
		[resendVerification],
	);

	return (
		<div className={loginWrapper}>
			<h1>Log In</h1>
			<LoginForm onSubmit={handleLogin} />
			<Link to={ROUTER_KEYS.FORGOT_PASSWORD}>Forgot Password?</Link>
			<hr />
			<h2>Didn't receive verification email?</h2>
			<ResendVerificationForm onSubmit={handlResendVerification} />
		</div>
	);
};

export default Login;
