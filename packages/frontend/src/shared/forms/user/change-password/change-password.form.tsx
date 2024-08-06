import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';

const ChangePasswordSchema = Yup.object().shape({
	oldPassword: Yup.string().required('Required'),
	newPassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Required'),
	confirmNewPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
		.required('Required'),
});

interface ChangePasswordFormProps {
	onSubmit: (oldPassword: string, newPassword: string) => Promise<void>;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
	onSubmit,
}) => {
	const handleSubmit = async (
		values: {
			oldPassword: string;
			newPassword: string;
			confirmNewPassword: string;
		},
		{ setSubmitting, resetForm },
	) => {
		await onSubmit(values.oldPassword, values.newPassword);
		setSubmitting(false);
		resetForm();
	};

	return (
		<Formik
			initialValues={{
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: '',
			}}
			validationSchema={ChangePasswordSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<FormGroup
						label="Old Password"
						labelFor="oldPassword"
						intent={
							errors.oldPassword && touched.oldPassword
								? Intent.DANGER
								: Intent.NONE
						}
						helperText={
							errors.oldPassword && touched.oldPassword
								? errors.oldPassword
								: ''
						}
					>
						<Field name="oldPassword">
							{({ field }) => (
								<InputGroup
									{...field}
									id="oldPassword"
									type="password"
									placeholder="Enter your old password"
									intent={
										errors.oldPassword &&
										touched.oldPassword
											? Intent.DANGER
											: Intent.NONE
									}
								/>
							)}
						</Field>
					</FormGroup>
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
									type="password"
									placeholder="Enter your new password"
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
						label="Confirm New Password"
						labelFor="confirmNewPassword"
						intent={
							errors.confirmNewPassword &&
							touched.confirmNewPassword
								? Intent.DANGER
								: Intent.NONE
						}
						helperText={
							errors.confirmNewPassword &&
							touched.confirmNewPassword
								? errors.confirmNewPassword
								: ''
						}
					>
						<Field name="confirmNewPassword">
							{({ field }) => (
								<InputGroup
									{...field}
									id="confirmNewPassword"
									type="password"
									placeholder="Confirm your new password"
									intent={
										errors.confirmNewPassword &&
										touched.confirmNewPassword
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
						text="Change Password"
					/>
				</Form>
			)}
		</Formik>
	);
};

export default ChangePasswordForm;
