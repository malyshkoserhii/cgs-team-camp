import { Button, Card } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '~shared/components/input/input.component';
import { ROUTER_KEYS } from '~shared/keys';
import { resetPasswordSchema } from '~shared/schemas/user.schema';
import { useAuthStore } from '~store/auth.store';

interface INewPassword {
	newPassword: string;
}

const ResetPasswordPage = (): React.ReactNode => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { resetPassword } = useAuthStore();

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(resetPasswordSchema) });

	const onSubmit = (data: INewPassword): void => {
		resetPassword(id, data.newPassword);
		reset();
		navigate(ROUTER_KEYS.LOGIN);
	};

	return (
		<Card>
			<h2>Reset your password</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="password"
					label="New Password"
					{...register('newPassword')}
					errorMessage={errors?.newPassword?.message}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Card>
	);
};

export default ResetPasswordPage;
