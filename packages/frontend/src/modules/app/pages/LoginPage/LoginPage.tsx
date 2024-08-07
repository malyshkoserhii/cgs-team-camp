import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { ROUTER_KEYS } from '~shared/keys';
import { useUserStore } from '~store/user.store';
import { LinkContainerStyles } from '../SignupPage/SignupPage.styles';
import { User } from '~shared/types/user.type';

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<Partial<User>>();
	const { logIn } = useUserStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const onSubmit = async (data: Partial<User>): Promise<void> => {
		try {
			await logIn(data);
			reset();
			navigate(ROUTER_KEYS.TODO);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while logging in.',
			);
		}
	};

	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title={'Log In'}
			submitError={submitError}
		>
			<TextInput
				name="email"
				register={register}
				placeholder="Email"
				required
				error={errors.email}
				inputType="email"
				minLength={3}
				maxLength={50}
			/>
			<Link to={ROUTER_KEYS.FORGOT_PASSWORD}>Forgot Password?</Link>
			<TextInput
				name="password"
				register={register}
				placeholder="Passsword"
				required
				error={errors.password}
				inputType="password"
				minLength={6}
				maxLength={25}
			/>
			<div className={LinkContainerStyles}>
				Don't have an account?
				<Link to={ROUTER_KEYS.SIGNUP}>Sign Up</Link>
			</div>
		</Form>
	);
};
