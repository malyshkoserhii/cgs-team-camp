import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import * as Yup from 'yup';

import { ROUTER_KEYS } from '~shared/keys';

import { buttonsWrapper } from './registration-form.styles';

import type { RegisterInput } from '~typings/user';

type RegisterFormProps = {
	onSubmit: (values: RegisterInput) => void;
};

const RegisterSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(6, 'Password should be at least 6 characters')
		.required('Required'),
});

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (values: RegisterInput, { setSubmitting }) => {
			await onSubmit(values);
			setSubmitting(false);
		},
		[onSubmit],
	);
	return (
		<Formik
			initialValues={{ name: '', email: '', password: '' }}
			validationSchema={RegisterSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form>
					<FormGroup label="Name" labelFor="name">
						<Field name="name">
							{({ field }) => (
								<InputGroup
									{...field}
									id="name"
									placeholder="Enter your name"
									intent={
										errors.name && touched.name
											? 'danger'
											: 'none'
									}
								/>
							)}
						</Field>
					</FormGroup>
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
							Register
						</Button>
						<Button onClick={() => navigate(ROUTER_KEYS.LOGIN)}>
							Go to login
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
