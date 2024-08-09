import { Button, Card } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from '~shared/components/input/input.component';
import { ROUTER_KEYS } from '~shared/keys';
import { fogetPasswordSchema } from '~shared/schemas/user.schema';
import { useAuthStore } from '~store/auth.store';
import { formWrapper } from './fogetPassword.styles';

interface IFormData {
	email: string;
}

const FogetPasswordPage = (): React.ReactNode => {
	const { fogetPassword } = useAuthStore();

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(fogetPasswordSchema) });

	const onSubmit = (data: IFormData): void => {
		fogetPassword(data);
		reset();
	};

	return (
		<Card className={formWrapper}>
			<h2>Reset your password</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="email"
					label="Email"
					{...register('email')}
					errorMessage={errors?.email?.message}
				/>
				<Button type="submit">Submit</Button>
			</form>

			<Card className={formWrapper}>
				<Link to={ROUTER_KEYS.LOGIN}>Sign in</Link>
				<Link to={ROUTER_KEYS.REGISTER}>Sign up</Link>
			</Card>
		</Card>
	);
};

export default FogetPasswordPage;
