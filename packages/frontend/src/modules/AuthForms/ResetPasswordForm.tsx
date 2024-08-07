import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuthStore } from '~store/auth.store';
import { userValidationSchema } from '../../shared/schemas/user.schema';
import { User } from '~typings/user.types';
import { ROUTER_KEYS } from '~shared/keys';
import { CustomForm, CustomField, Loader } from '~shared/components';

export const ResetPasswordForm: React.FC = () => {
	const navigate = useNavigate();
	const { token } = useParams();
	const { user, resetPassword, loading } = useAuthStore();
	const initialValues: User = {
		password: user?.password || '',
	};

	const handleSubmit = async (
		values: User,
		{ resetForm }: { resetForm: () => void },
	): Promise<void> => {
		await resetPassword(values.password, token);
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
			title={'Enter new password'}
		>
			<CustomField
				id={'password'}
				label={'New password'}
				name={'password'}
			/>
		</CustomForm>
	);
};
