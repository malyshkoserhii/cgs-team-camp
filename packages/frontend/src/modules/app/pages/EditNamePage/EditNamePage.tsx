import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { ROUTER_KEYS } from '~shared/keys';
import { useUserStore } from '~store/user.store';

export const EditNamePage: React.FC = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<{ name: string }>();
	const { user, editProfile } = useUserStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const onSubmit = async (data: { name: string }): Promise<void> => {
		try {
			await editProfile(data);
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
				name="name"
				register={register}
				placeholder="Name"
				required
				defaultValue={user.name}
				error={errors.name}
				minLength={3}
				maxLength={50}
			/>
		</Form>
	);
};
