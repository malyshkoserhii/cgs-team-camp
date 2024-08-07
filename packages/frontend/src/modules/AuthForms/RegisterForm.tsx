import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '~store/auth.store';
import { User } from '~typings/user.types';
import { userValidationSchema } from '../../shared/schemas/user.schema';
import { ROUTER_KEYS } from '~shared/keys';
import { CustomForm, CustomField, Loader } from '~shared/components';

export const RegisterForm: React.FC = () => {
	const navigate = useNavigate();
	const { user, register, loading } = useAuthStore();
	const initialValues: User = {
		username: user?.username || '',
		email: user?.email || '',
		password: user?.password || '',
	};

	const handleSubmit = async (
		values: User,
		{ resetForm }: { resetForm: () => void },
	): Promise<void> => {
		await register(values);
		resetForm();
		navigate(ROUTER_KEYS.MAIN);
	};

	if (loading) {
		return <Loader loading={loading} />;
	}

	return (
		<CustomForm
			initialValues={initialValues}
			validationSchema={userValidationSchema}
			onSubmit={handleSubmit}
			title={'Registration'}
		>
			<CustomField id={'username'} label={'Name'} name={'username'} />
			<CustomField id={'email'} label={'Email'} name={'email'} />
			<CustomField id={'password'} label={'Password'} name={'password'} />
		</CustomForm>
	);
};
