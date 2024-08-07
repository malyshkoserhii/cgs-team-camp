import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '~store/auth.store';
import { userValidationSchema } from '../../shared/schemas/user.schema';
import { User } from '~typings/user.types';
import { ROUTER_KEYS } from '~shared/keys';
import { CustomForm, CustomField, Loader } from '~shared/components';

export const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const { user, login, loading } = useAuthStore();
	const initialValues: User = {
		email: user?.email || '',
		password: user?.password || '',
	};

	const handleSubmit = async (
		values: User,
		{ resetForm }: { resetForm: () => void },
	): Promise<void> => {
		await login(values);
		navigate(ROUTER_KEYS.DASHBOARD);
		resetForm();
	};

	if (loading) {
		return <Loader loading={loading} />;
	}

	return (
		<CustomForm
			initialValues={initialValues}
			validationSchema={userValidationSchema}
			onSubmit={handleSubmit}
			title={'Login'}
		>
			<CustomField id={'email'} label={'Email'} name={'email'} />
			<CustomField id={'password'} label={'Password'} name={'password'} />
		</CustomForm>
	);
};
