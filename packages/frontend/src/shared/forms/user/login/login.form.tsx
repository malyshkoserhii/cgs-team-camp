import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button } from '@blueprintjs/core';
import * as Yup from 'yup';

import { ROUTER_KEYS } from '~shared/keys';
import { initialValues } from './const';
import TextField from '~shared/components/text-field/text-field.component';

import { buttonsWrapper } from './login-form.styles';

import type { LoginInput } from '~typings/user';

type LoginFormProps = {
	onSubmit: (values: LoginInput) => void;
};

const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
});

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (values: LoginInput, { setSubmitting }) => {
			await onSubmit(values);
			setSubmitting(false);
		},
		[onSubmit],
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={LoginSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form>
					<TextField<LoginInput>
						name="email"
						type="email"
						label="Email"
						placeholder="Enter your email"
						errors={errors}
						touched={touched}
					/>
					<TextField<LoginInput>
						name="password"
						type="password"
						label="Password"
						placeholder="Enter your password"
						errors={errors}
						touched={touched}
					/>
					<div className={buttonsWrapper}>
						<Button
							type="submit"
							intent="primary"
							disabled={isSubmitting}
						>
							Login
						</Button>
						<Button onClick={() => navigate(ROUTER_KEYS.REGISTER)}>
							Sign Up
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
