import { Button, Card, Text } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '~shared/components/input/input.component';
import { ChangePasswordData } from '~shared/interfaces/user.interface';
import { changePasswordSchema } from '~shared/schemas/user.schema';
import { useAuthStore } from '~store/auth.store';
import { profileWrapper } from './userProfile.styles';

const UserProfile = (): React.ReactNode => {
	const { changePassword, logOut } = useAuthStore();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(changePasswordSchema) });

	const onSubmit = (data: ChangePasswordData): void => {
		changePassword(data);
		reset();
	};

	return (
		<Card className={profileWrapper}>
			<Text>User Info</Text>
			<Text>User Info</Text>

			<Card>
				<Text>Change Password</Text>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="password"
						label="Old Password"
						{...register('oldPassword')}
						errorMessage={errors?.oldPassword?.message}
					/>
					<Input
						type="password"
						label="New Password"
						{...register('newPassword')}
						errorMessage={errors?.newPassword?.message}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Card>

			<Button onClick={logOut}>Log out</Button>
		</Card>
	);
};

export default UserProfile;
