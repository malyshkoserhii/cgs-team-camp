import React, { FC, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Intent } from '@blueprintjs/core';

import TextField from '~shared/components/text-field/text-field.component';

import type { NameInput } from '~typings/user';

const UpdateNameSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
});

interface UpdateNameFormProps {
	initialName: string;
	onSubmit: (name: string) => Promise<void>;
}

const UpdateNameForm: FC<UpdateNameFormProps> = ({ initialName, onSubmit }) => {
	const handleSubmit = useCallback(
		async (values: NameInput, { setSubmitting }) => {
			await onSubmit(values.name);
			setSubmitting(false);
		},
		[onSubmit],
	);

	return (
		<Formik
			initialValues={{ name: initialName }}
			validationSchema={UpdateNameSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<TextField<NameInput>
						name="name"
						type="text"
						label="Name"
						placeholder="Enter your name"
						errors={errors}
						touched={touched}
					/>
					<Button
						type="submit"
						intent={Intent.PRIMARY}
						text="Update Name"
					/>
				</Form>
			)}
		</Formik>
	);
};

export default UpdateNameForm;
