import React, { useCallback } from 'react';

import { useRegister } from '~/api/hooks/useUser';
import RegisterForm from '~shared/forms/user/registration/registration.form';

import { registerWrapper } from './register.styles';
import { showToast } from '~/utils/showToast';

import type { RegisterInput } from '~typings/user';

const Register = () => {
	const { mutateAsync: register } = useRegister();

	const handleRegister = useCallback(
		async (values: RegisterInput) => {
			await register(values);
			showToast(
				'Account created. Check your mailbox to verify your email.',
			);
		},
		[register],
	);

	return (
		<div className={registerWrapper}>
			<h1>Sign Up</h1>
			<RegisterForm onSubmit={handleRegister} />
		</div>
	);
};

export default Register;
