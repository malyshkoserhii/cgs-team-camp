import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { ROUTER_KEYS } from '~shared/keys';
import { useUserStore } from '~store/user.store';
import { changePassword } from '~shared/types/changePassword.type';

export const ChangePasswordPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<changePassword>();
	const { changePassword } = useUserStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const onSubmit = async (data: changePassword): Promise<void> => {
		if (data.newPassword !== data.repeatPassword) {
			setSubmitError('Passwords do not match');
			return;
		}
		try {
			await changePassword(data.currentPassword, data.newPassword);
			reset();
			navigate(ROUTER_KEYS.TODO);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while editing the user.',
			);
		}
	};

	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title={'Edit Profile'}
			submitError={submitError}
		>
			<TextInput
				name="currentPassword"
				register={register}
				placeholder="Current Password"
				inputType="password"
				required
				error={errors.currentPassword}
				minLength={6}
				maxLength={25}
			/>
			<TextInput
				name="newPassword"
				register={register}
				placeholder="New Password"
				inputType="password"
				required
				error={errors.newPassword}
				minLength={6}
				maxLength={25}
			/>
			<TextInput
				name="repeatPassword"
				register={register}
				placeholder="Repeat Password"
				inputType="password"
				required
				error={errors.repeatPassword}
				minLength={6}
				maxLength={25}
			/>
		</Form>
	);
};
