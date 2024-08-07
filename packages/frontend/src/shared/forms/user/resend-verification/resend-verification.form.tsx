import React, { FC, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Intent } from '@blueprintjs/core';

import TextField from '~shared/components/text-field/text-field.component';
import { initialValues } from './const';

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
			initialValues={initialValues}
			validationSchema={ResendVerificationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isSubmitting }) => (
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
