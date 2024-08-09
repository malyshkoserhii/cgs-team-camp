import { Button } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '~shared/components/input/input.component';
import { IRegisterData } from '~shared/interfaces/user.interface';
import { ROUTER_KEYS } from '~shared/keys';
import { registerSchema } from '~shared/schemas/auth.schema';
import { useAuthStore } from '~store/auth.store';

const RegisterPage = (): React.ReactNode => {
	const navigate = useNavigate();
	const { register: registerUser } = useAuthStore();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<Partial<IRegisterData>>({
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = (data: IRegisterData): void => {
		registerUser(data);
		reset();
		navigate(ROUTER_KEYS.LOGIN);
	};

	return (
		<div>
			<h2>Register Page</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Username"
					{...register('username', { required: true })}
					errorMessage={errors?.username?.message}
				/>
				<Input
					type="email"
					label="Email"
					{...register('email', { required: true })}
					errorMessage={errors?.email?.message}
				/>
				<Input
					label="Password"
					{...register('password', { required: true })}
					type="password"
					errorMessage={errors?.password?.message}
				/>

				<Button type="submit">Register</Button>
			</form>
			<Link to={ROUTER_KEYS.LOGIN}>Sign in</Link>
		</div>
	);
};

export default RegisterPage;
