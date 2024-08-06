import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import { ROUTER_KEYS } from '~shared/keys';
import { Button, CustomField, Loader } from '~shared/components';
import { buttonGroupStyle, container, formStyle } from './RegisterForm.styles';
import { User } from '~typings/user.types';
import { useAuthStore } from '~store/auth.store';
import { toast } from 'react-toastify';

export const RegistrationForm: React.FC = () => {
	const navigate = useNavigate();
	const { user, loading, register } = useAuthStore();

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

		navigate(ROUTER_KEYS.MAIN);
		resetForm();
		toast.success(
			'For complete registration, please check your email and verify your account.',
		);
	};

	if (loading) {
		return <Loader loading={loading} />;
	}

	return (
		<div className={container}>
			<h2>{'Registration'}</h2>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form className={formStyle}>
					<CustomField
						id={'username'}
						name={'username'}
						label={'User'}
					/>

					<CustomField id={'email'} name={'email'} label={'Email'} />
					<CustomField
						id={'password'}
						name={'password'}
						label={'Password'}
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
