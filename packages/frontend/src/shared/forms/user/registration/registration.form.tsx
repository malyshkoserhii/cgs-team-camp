import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button } from '@blueprintjs/core';
import * as Yup from 'yup';

import { ROUTER_KEYS } from '~shared/keys';
import { initialValues } from './const';
import TextField from '~shared/components/text-field/text-field.component';

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
			initialValues={initialValues}
			validationSchema={RegisterSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form>
					<TextField<RegisterInput>
						name="name"
						type="text"
						label="Name"
						placeholder="Enter your name"
						errors={errors}
						touched={touched}
					/>
					<TextField<RegisterInput>
						name="email"
						type="email"
						label="Email"
						placeholder="Enter your email"
						errors={errors}
						touched={touched}
					/>
					<TextField<RegisterInput>
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
