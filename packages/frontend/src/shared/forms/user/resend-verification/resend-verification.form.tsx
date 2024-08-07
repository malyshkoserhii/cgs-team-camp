import React, { FC, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';

import type { EmailInput } from '~typings/user';

type ResendVerificationFormProps = {
	onSubmit: (values: EmailInput) => void;
};

const ResendVerificationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
});

const ResendVerificationForm: FC<ResendVerificationFormProps> = ({
	onSubmit,
}) => {
	const handleSubmit = useCallback(
		async (values: EmailInput, { setSubmitting }) => {
			await onSubmit(values);
			setSubmitting(false);
		},
		[onSubmit],
	);
	return (
		<Formik
			initialValues={{ email: '' }}
			validationSchema={ResendVerificationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form>
					<FormGroup
						label="Email"
						labelFor="email"
						helperText={touched.email && errors.email}
						intent={
							errors.email && touched.email
								? Intent.DANGER
								: Intent.NONE
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
						text="Resend Verification Email"
						loading={isSubmitting}
						disabled={isSubmitting}
					/>
				</Form>
			)}
		</Formik>
	);
};

export default ResendVerificationForm;
