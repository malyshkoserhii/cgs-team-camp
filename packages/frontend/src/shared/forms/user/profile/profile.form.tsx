// src/components/UserProfile.tsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import * as Yup from 'yup';
import { useAuthStore } from '~/store/auth.store';

const UserProfileSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
});

const UserProfile: React.FC = () => {
	const { user, updateUser, logout } = useAuthStore();

	if (!user) return null;

	return (
		<div>
			<h2>User Profile</h2>
			<Formik
				initialValues={{ name: user.name, email: user.email }}
				validationSchema={UserProfileSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						await updateUser(values);
						// Show success message
					} catch (error) {
						// Handle error
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form>
						<FormGroup label="Name" labelFor="name">
							<Field name="name">
								{({ field }) => (
									<InputGroup
										{...field}
										id="name"
										placeholder="Enter your name"
										intent={
											errors.name && touched.name
												? 'danger'
												: 'none'
										}
									/>
								)}
							</Field>
						</FormGroup>
						<FormGroup label="Email" labelFor="email">
							<Field name="email">
								{({ field }) => (
									<InputGroup
										{...field}
										id="email"
										type="email"
										placeholder="Enter your email"
										intent={
											errors.email && touched.email
												? 'danger'
												: 'none'
										}
									/>
								)}
							</Field>
						</FormGroup>
						<Button
							type="submit"
							intent="primary"
							disabled={isSubmitting}
						>
							Update Profile
						</Button>
					</Form>
				)}
			</Formik>
			<Button
				onClick={logout}
				intent="danger"
				style={{ marginTop: '20px' }}
			>
				Logout
			</Button>
		</div>
	);
};

export default UserProfile;
