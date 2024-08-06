import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTER_KEYS } from '~shared/keys';
import { Button, CustomField, Loader } from '~shared/components';
import { buttonGroupStyle, container, formStyle } from './RegisterForm.styles';
import { User } from '~typings/user.types';
import { useAuthStore } from '~store/auth.store';

export const ResetPasswordForm: React.FC = () => {
	const navigate = useNavigate();
	const { token } = useParams();
	const { user, loading, resetPassword } = useAuthStore();

	const initialValues: User = {
		password: user.password || '',
	};

	const handleSubmit = async (
		values: User,
		{ resetForm }: { resetForm: () => void },
	): Promise<void> => {
		console.log('values', values);

		await resetPassword(values.password, token);
		// navigate(ROUTER_KEYS.MAIN);
		resetForm();
	};

	if (loading) {
		return <Loader loading={loading} />;
	}

	return (
		<div className={container}>
			<h2>{'Enter new password'}</h2>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form className={formStyle}>
					<CustomField id={'password'} label={''} name={'password'} />
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
