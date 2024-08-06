import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import * as Yup from 'yup';

import { ROUTER_KEYS } from '~shared/keys';

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
			initialValues={{ email: '', password: '' }}
			validationSchema={LoginSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form>
					<FormGroup label="Email" labelFor="email">
						<Field name="email">
							{({ field }) => (
								<InputGroup
									{...field}
									id="email"
									type="email"
									placeholder="Enter your email"
									intent={
										errors.email && touched.email
											? 'danger'
											: 'none'
									}
								/>
							)}
						</Field>
					</FormGroup>
					<FormGroup label="Password" labelFor="password">
						<Field name="password">
							{({ field }) => (
								<InputGroup
									{...field}
									id="password"
									type="password"
									placeholder="Enter your password"
									intent={
										errors.password && touched.password
											? 'danger'
											: 'none'
									}
								/>
							)}
						</Field>
					</FormGroup>
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
