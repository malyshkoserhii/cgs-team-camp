import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import { ROUTER_KEYS } from '~shared/keys';
import { Button, CustomField, Loader } from '~shared/components';
import { buttonGroupStyle, container, formStyle } from './RegisterForm.styles';
import { User } from '~typings/user.types';
import { useAuthStore } from '~store/auth.store';

export const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const { user, loading, login } = useAuthStore();

	const initialValues: User = {
		email: user?.email || '',
		password: user?.password || '',
	};

	const handleSubmit = async (
		values: User,
		{ resetForm }: { resetForm: () => void },
	): Promise<void> => {
		await login(values);
		console.log('user after login', user);
		navigate(ROUTER_KEYS.MAIN);
		resetForm();
	};

	if (loading) {
		return <Loader loading={loading} />;
	}

	return (
		<div className={container}>
			<h2>{'Registration'}</h2>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form className={formStyle}>
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
