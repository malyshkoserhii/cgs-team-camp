import React, { FC, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Intent } from '@blueprintjs/core';

import { initialValues } from './const';
import TextField from '~shared/components/text-field/text-field.component';

import type { ChangePasswordInput } from '~typings/user';

const ChangePasswordSchema = Yup.object().shape({
	oldPassword: Yup.string().required('Required'),
	newPassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Required'),
	confirmNewPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
		.required('Required'),
});

type ChangePasswordFormProps = {
	onSubmit: (oldPassword: string, newPassword: string) => Promise<void>;
};

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ onSubmit }) => {
	const handleSubmit = useCallback(
		async (values: ChangePasswordInput, { setSubmitting, resetForm }) => {
			await onSubmit(values.oldPassword, values.newPassword);
			setSubmitting(false);
			resetForm();
		},
		[onSubmit],
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={ChangePasswordSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<TextField<ChangePasswordInput>
						name="oldPassword"
						type="password"
						label="Old Password"
						placeholder="Enter your old password"
						errors={errors}
						touched={touched}
					/>
					<TextField<ChangePasswordInput>
						name="newPassword"
						type="password"
						label="New Password"
						placeholder="Enter your new password"
						errors={errors}
						touched={touched}
					/>
					<TextField<ChangePasswordInput>
						name="confirmNewPassword"
						type="password"
						label="Confirm New Password"
						placeholder="Confirm your new password"
						errors={errors}
						touched={touched}
					/>
					<Button
						type="submit"
						intent={Intent.PRIMARY}
						text="Change Password"
					/>
				</Form>
			)}
		</Formik>
	);
};

export default ChangePasswordForm;
