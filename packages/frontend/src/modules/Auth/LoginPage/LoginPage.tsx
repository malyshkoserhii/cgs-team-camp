import React from 'react';

import { useNavigate } from 'react-router-dom';
import { UtilForm } from '~shared/components/form/form';

import { Input } from '~shared/components/input/input.component';
import { PageHeader } from '~shared/components/page-wrapper/page-wraper.styles.';
import PageWrapper from '~shared/components/page-wrapper/page-wrapper';
import {
	ForgetPasswordInitState,
	LoginInitState,
} from '~shared/constants/form-initial-values/user-form-init-values';

import { ROUTER_KEYS } from '~shared/keys/router-keys';
import { UserLoginSchema } from '~shared/schemas/auth.schema';
import { ForgetPasswordSchema } from '~shared/schemas/user.schema';

import { forgetPasswordType, LoginUserType } from '~shared/types/user.types';
import { useAuthStore } from '~store/auth.store';

const LoginPage = (): React.ReactNode => {
	const navigate = useNavigate();
	const authStore = useAuthStore();

	const loading = authStore.loading;
	const onlogin = async (values: LoginUserType): Promise<void> => {
		await authStore.login(values);
		navigate(ROUTER_KEYS.DASHBOARD);
	};
	const onForgetPassword = (values: forgetPasswordType): void => {
		authStore.forgetPassword(values.email);
	};

	return (
		<>
			<h2 className={PageHeader}>Login Page</h2>
			<PageWrapper loading={loading}>
				<UtilForm
					onSubmit={onlogin}
					initialValues={LoginInitState}
					schema={UserLoginSchema}
					submitButtonText="Login"
				>
					<Input
						name="email"
						placeholder="email"
						title="email"
						type="email"
					/>
					<Input
						name="password"
						placeholder="password"
						title="password"
						type="password"
					/>
				</UtilForm>
				<h3 className={PageHeader}>
					Forgot password - we will send yo reset link to your email
				</h3>
				<UtilForm
					onSubmit={onForgetPassword}
					initialValues={ForgetPasswordInitState}
					schema={ForgetPasswordSchema}
					submitButtonText="Forgot password"
				>
					<Input
						name="email"
						placeholder="email"
						title="email"
						type="email"
					/>
				</UtilForm>
			</PageWrapper>
		</>
	);
};

export default LoginPage;
