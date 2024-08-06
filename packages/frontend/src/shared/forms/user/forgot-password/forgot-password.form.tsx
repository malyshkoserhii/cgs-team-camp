import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';

import { useForgotPassword } from '~/api/hooks/useUser';
import { showToast } from '~/utils/showToast';

const ForgotPasswordSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPasswordForm: React.FC = () => {
	const { mutateAsync: forgotPassword } = useForgotPassword();

	const handleSubmit = async (values: { email: string }) => {
		await forgotPassword(values.email);
		showToast('Password reset instructions sent to your email');
	};

	return (
		<Formik
			initialValues={{ email: '' }}
			validationSchema={ForgotPasswordSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<FormGroup
						label="Email"
						labelFor="email"
						intent={
							errors.email && touched.email
								? Intent.DANGER
								: Intent.NONE
						}
						helperText={
							errors.email && touched.email ? errors.email : ''
						}
					>
						<Field name="email">
							{({ field }) => (
								<InputGroup
									{...field}
									id="email"
									placeholder="Enter your email"
									type="email"
									intent={
										errors.email && touched.email
											? Intent.DANGER
											: Intent.NONE
									}
								/>
							)}
						</Field>
					</FormGroup>
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
