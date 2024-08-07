import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';

const UpdateNameSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
});

interface UpdateNameFormProps {
	initialName: string;
	onSubmit: (name: string) => Promise<void>;
}

const UpdateNameForm: React.FC<UpdateNameFormProps> = ({
	initialName,
	onSubmit,
}) => {
	const handleSubmit = async (
		values: { name: string },
		{ setSubmitting },
	) => {
		await onSubmit(values.name);
		setSubmitting(false);
	};

	return (
		<Formik
			initialValues={{ name: initialName }}
			validationSchema={UpdateNameSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<FormGroup
						label="Name"
						labelFor="name"
						intent={
							errors.name && touched.name
								? Intent.DANGER
								: Intent.NONE
						}
						helperText={
							errors.name && touched.name ? errors.name : ''
						}
					>
						<Field name="name">
							{({ field }) => (
								<InputGroup
									{...field}
									id="name"
									placeholder="Enter your name"
									intent={
										errors.name && touched.name
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
						text="Update Name"
					/>
				</Form>
			)}
		</Formik>
	);
};

export default UpdateNameForm;
