import React, { FC, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Intent } from '@blueprintjs/core';

import { useForgotPassword } from '~/api/hooks/useUser';
import { showToast } from '~/utils/showToast';
import TextField from '~shared/components/text-field/text-field.component';
import { initialValues } from './const';

import type { EmailInput } from '~typings/user';

const ForgotPasswordSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPasswordForm: FC = () => {
	const { mutateAsync: forgotPassword } = useForgotPassword();

	const handleSubmit = useCallback(
		async (values: EmailInput) => {
			await forgotPassword(values.email);
			showToast('Password reset instructions sent to your email');
		},
		[forgotPassword],
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={ForgotPasswordSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<TextField<EmailInput>
						name="email"
						type="email"
						label="Email"
						placeholder="Enter your email"
						errors={errors}
						touched={touched}
					/>
					<Button
						type="submit"
						intent={Intent.PRIMARY}
						text="Reset Password"
					/>
				</Form>
			)}
		</Formik>
	);
};

export default ForgotPasswordForm;
