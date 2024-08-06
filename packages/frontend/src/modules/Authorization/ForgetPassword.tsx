import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import { ROUTER_KEYS } from '~shared/keys';
import { Button, CustomField, Loader } from '~shared/components';
import { buttonGroupStyle, container, formStyle } from './RegisterForm.styles';
import { User } from '~typings/user.types';
import { useAuthStore } from '~store/auth.store';

export const ForgetPasswordForm: React.FC = () => {
	const navigate = useNavigate();
	const { user, loading, forgetPassword } = useAuthStore();

	const initialValues: User = {
		email: user?.email || '',
	};

	const handleSubmit = async (
		values: User,
		{ resetForm }: { resetForm: () => void },
	): Promise<void> => {
		await forgetPassword(values);
		navigate(ROUTER_KEYS.MAIN);
		resetForm();
	};

	if (loading) {
		return <Loader loading={loading} />;
	}

	return (
		<div className={container}>
			<h2>{'Forget password'}</h2>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form className={formStyle}>
					<CustomField
						id={'email'}
						name={'email'}
						label={'Enter your email'}
					/>
					<div className={buttonGroupStyle}>
						<Button
							text="Back"
							type="button"
							onClick={() => navigate(ROUTER_KEYS.MAIN)}
						/>
						<Button text={'Submit'} type="submit" />
					</div>
				</Form>
			</Formik>
		</div>
	);
};
