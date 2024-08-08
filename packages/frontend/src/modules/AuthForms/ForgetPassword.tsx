import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '~store/auth.store';
import { userValidationSchema } from '../../shared/schemas/user.schema';
import { User } from '~typings/user.types';
import { ROUTER_KEYS } from '~shared/keys';
import { CustomForm, CustomField, Loader } from '~shared/components';

export const ForgetPasswordForm: React.FC = () => {
	const navigate = useNavigate();
	const { user, forgetPassword, loading } = useAuthStore();
	const initialValues: User = {
		email: user?.email || '',
	};

	const handleSubmit = async (
		values: User,
		{ resetForm }: { resetForm: () => void },
	): Promise<void> => {
		await forgetPassword(values);
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
			title={'Forget password'}
		>
			<CustomField
				id={'email'}
				label={'Enter your email'}
				name={'email'}
			/>
		</CustomForm>
	);
};
