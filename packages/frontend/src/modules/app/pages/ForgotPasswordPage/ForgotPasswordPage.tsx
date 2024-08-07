import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { useUserStore } from '~store/user.store';

export const ForgotPasswordPage: React.FC = () => {
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<{ email: string }>();
	const { forgotPassword } = useUserStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);
	const [message, setMessage] = useState<string | undefined>(undefined);

	const onSubmit = async (data: { email: string }): Promise<void> => {
		try {
			setMessage(await forgotPassword(data.email));
			reset();
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while validating your request.',
			);
		}
	};

	return (
		<>
			{!message ? (
				<Form
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					title={'Forgot Password'}
					submitError={submitError}
				>
					<TextInput
						name="email"
						register={register}
						placeholder="Account Email"
						required
						inputType="email"
						error={errors.email}
						minLength={3}
						maxLength={50}
					/>
				</Form>
			) : (
				<p>{message}</p>
			)}
		</>
	);
};
