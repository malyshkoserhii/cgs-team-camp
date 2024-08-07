import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Intent } from '@blueprintjs/core';

import { useResetPassword } from '~/api/hooks/useUser';
import { showToast } from '~/utils/showToast';
import { ROUTER_KEYS } from '~shared/keys';
import TextField from '~shared/components/text-field/text-field.component';
import { initialValues, ResetPasswordSchema } from './const';

import type { ResetPasswordInput } from '~typings/user';

type ResetPasswordFormProps = {
	resetToken: string;
};

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ resetToken }) => {
	const navigate = useNavigate();
	const { mutateAsync: resetPassword } = useResetPassword();

	const handleSubmit = useCallback(
		async (values: ResetPasswordInput) => {
			await resetPassword({
				resetToken,
				newPassword: values.newPassword,
			});
			showToast('Password has been reset successfully');
			navigate(ROUTER_KEYS.LOGIN);
		},
		[resetPassword],
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={ResetPasswordSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<TextField<ResetPasswordInput>
						name="newPassword"
						type="password"
						label="New Password"
						placeholder="Enter new password"
						errors={errors}
						touched={touched}
					/>
					<TextField<ResetPasswordInput>
						name="confirmPassword"
						type="password"
						label="Confirm Password"
						placeholder="Confirm new password"
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

export default ResetPasswordForm;
