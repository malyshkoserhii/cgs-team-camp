import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';

import { useResetPassword } from '~/api/hooks/useUser';
import { showToast } from '~/utils/showToast';
import { ROUTER_KEYS } from '~shared/keys';

const ResetPasswordSchema = Yup.object().shape({
	newPassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
		.required('Required'),
});

interface ResetPasswordFormProps {
	resetToken: string;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ resetToken }) => {
	const navigate = useNavigate();
	const { mutateAsync: resetPassword } = useResetPassword();

	const handleSubmit = async (values: {
		newPassword: string;
		confirmPassword: string;
	}) => {
		await resetPassword({
			resetToken,
			newPassword: values.newPassword,
		});
		showToast('Password has been reset successfully');
		navigate(ROUTER_KEYS.LOGIN);
	};

	return (
		<Formik
			initialValues={{ newPassword: '', confirmPassword: '' }}
			validationSchema={ResetPasswordSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<FormGroup
						label="New Password"
						labelFor="newPassword"
						intent={
							errors.newPassword && touched.newPassword
								? Intent.DANGER
								: Intent.NONE
						}
						helperText={
							errors.newPassword && touched.newPassword
								? errors.newPassword
								: ''
						}
					>
						<Field name="newPassword">
							{({ field }) => (
								<InputGroup
									{...field}
									id="newPassword"
									placeholder="Enter new password"
									type="password"
									intent={
										errors.newPassword &&
										touched.newPassword
											? Intent.DANGER
											: Intent.NONE
									}
								/>
							)}
						</Field>
					</FormGroup>
					<FormGroup
						label="Confirm Password"
						labelFor="confirmPassword"
						intent={
							errors.confirmPassword && touched.confirmPassword
								? Intent.DANGER
								: Intent.NONE
						}
						helperText={
							errors.confirmPassword && touched.confirmPassword
								? errors.confirmPassword
								: ''
						}
					>
						<Field name="confirmPassword">
							{({ field }) => (
								<InputGroup
									{...field}
									id="confirmPassword"
									placeholder="Confirm new password"
									type="password"
									intent={
										errors.confirmPassword &&
										touched.confirmPassword
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

export default ResetPasswordForm;
