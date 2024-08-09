import { Button, Card } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from '~shared/components/input/input.component';
import { LoginData } from '~shared/interfaces/user.interface';
import { ROUTER_KEYS } from '~shared/keys';
import { loginSchema } from '~shared/schemas/auth.schema';
import { useAuthStore } from '~store/auth.store';
import { formWrapper } from './auth.styles';

const LoginPage = (): React.ReactNode => {
	const { login } = useAuthStore();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<Partial<LoginData>>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = (data: LoginData): void => {
		login(data);
		reset();
	};

	return (
		<div>
			<Card className={formWrapper}>
				<h2>Login</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="email"
						label="Email"
						{...register('email')}
						errorMessage={errors?.email?.message}
					/>
					<Input
						label="Password"
						{...register('password')}
						type="password"
						errorMessage={errors?.password?.message}
					/>

					<Button type="submit">Login</Button>
				</form>
				<Card className={formWrapper}>
					<Link to={ROUTER_KEYS.REGISTER}>Sign up</Link>
					<Link to={ROUTER_KEYS.FOGET_PASSWORD}>Foget Password</Link>
				</Card>
			</Card>
		</div>
	);
};

export default LoginPage;
