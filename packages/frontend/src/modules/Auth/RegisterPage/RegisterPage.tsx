import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtilForm } from '~shared/components/form/form';
import { Input } from '~shared/components/input/input.component';
import { PageHeader } from '~shared/components/page-wrapper/page-wraper.styles.';
import PageWrapper from '~shared/components/page-wrapper/page-wrapper';
import { RegisterInitState } from '~shared/constants/form-initial-values/user-form-init-values';

import { ROUTER_KEYS } from '~shared/keys/router-keys';
import { UserRegisterSchema } from '~shared/schemas/auth.schema';

import { User } from '~shared/types/user.types';
import { useAuthStore } from '~store/auth.store';

const RegisterPage = (): React.ReactNode => {
	const authStore = useAuthStore();
	const error = authStore.authError;
	const loading = authStore.loading;
	const navigate = useNavigate();
	const onregister = async (values: User): Promise<void> => {
		await authStore.register(values);
		if (!authStore.authError) navigate(ROUTER_KEYS.LOGIN);
	};

	return (
		<>
			<h2 className={PageHeader}>Register Page</h2>
			<PageWrapper error={error} loading={loading}>
				<UtilForm
					onSubmit={onregister}
					initialValues={RegisterInitState}
					schema={UserRegisterSchema}
					submitButtonText="Register"
					serverError={authStore.authError}
				>
					<Input
						name="username"
						placeholder="username"
						title="username"
						type="text"
					/>
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
			</PageWrapper>
		</>
	);
};

export default RegisterPage;
