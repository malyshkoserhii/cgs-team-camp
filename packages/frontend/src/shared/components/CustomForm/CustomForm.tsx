import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';

import { Button } from '~shared/components';
import { userValidationSchema } from '../../schemas/user.schema';
import {
	buttonGroupStyle,
	container,
	formStyle,
} from '~shared/components/CustomForm/CustomForm.styles';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';

interface CustomFormProps<T> {
	initialValues: T;
	validationSchema: typeof userValidationSchema;
	onSubmit: (
		values: T,
		formikHelpers: FormikHelpers<T>,
	) => void | Promise<void>;
	children: React.ReactNode;
	title: string;
}

export const CustomForm = <T extends object>({
	title,
	initialValues,
	validationSchema,
	onSubmit,
	children,
}: CustomFormProps<T>): React.ReactElement => {
	const navigate = useNavigate();

	return (
		<div className={container}>
			<h2>{title}</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{() => (
					<Form className={formStyle}>
						{children}
						<div className={buttonGroupStyle}>
							<Button
								text="Back"
								type="button"
								onClick={() => navigate(ROUTER_KEYS.MAIN)}
							/>
							<Button text={'Submit'} type="submit" />
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
