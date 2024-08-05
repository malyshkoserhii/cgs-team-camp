import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '~shared/components/form/form.component';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '~shared/components/textinput/textinput.component';
import { ROUTER_KEYS } from '~shared/keys';
import { useUserStore } from '~store/user.store';
import { LinkContainerStyles } from './SignupPage.styles';
import { User } from '~shared/types/user.type';

export const SignupPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<Partial<User>>();
	const { signUp } = useUserStore();
	const [submitError, setSubmitError] = useState<string | undefined>(
		undefined,
	);

	const onSubmit = async (data: Partial<User>): Promise<void> => {
		try {
			await signUp(data);

			reset();
			navigate(ROUTER_KEYS.LOGIN);
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: 'An error occurred while signing up.',
			);
		}
	};

	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title={'Sign Up'}
			submitError={submitError}
		>
			<TextInput
				name="name"
				register={register}
				placeholder="Name"
				required
				error={errors.password}
				minLength={6}
				maxLength={25}
			/>
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
				Already have an account?
				<Link to={ROUTER_KEYS.LOGIN}>Log In</Link>
			</div>
		</Form>
	);
};
