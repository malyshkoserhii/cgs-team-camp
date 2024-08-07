import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { Link, useParams } from 'react-router-dom';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { ROUTER_KEYS } from '~shared/keys';
import { useUserStore } from '~store/user.store';

export const ResetPasswordPage: React.FC = () => {
	const { token } = useParams<{ token: string }>();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<{ newPassword: string }>();
	const { resetPassword } = useUserStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);
	const [message, setMessage] = useState<string | undefined>(undefined);

	const onSubmit = async (data: { newPassword: string }): Promise<void> => {
		try {
			setMessage(await resetPassword(token, data.newPassword));
			reset();
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while editing the user.',
			);
		}
	};

	return (
		<>
			{!message ? (
				<Form
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					title={'Reset Password'}
					submitError={submitError}
				>
					<TextInput
						name="newPassword"
						register={register}
						placeholder="New Password"
						required
						error={errors.newPassword}
						minLength={3}
						maxLength={50}
					/>
				</Form>
			) : (
				<>
					<p>{message}</p>
					<Link to={ROUTER_KEYS.LOGIN}>Log In</Link>
				</>
			)}
		</>
	);
};
