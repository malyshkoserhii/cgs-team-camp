import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { Link, useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Input,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { tryCatch, validateFormValues } from '~/utils';
import { authSchema } from './validation.schema';
import { FormInput } from '~shared/components/ui/form/form-input';
import { ROUTER_KEYS } from '~shared/keys';
import { AuthData } from '~shared/types/auth/auth.types';
import authService from '../auth.service';
import { useUserStore } from '~/state/store/user.store';

export interface AuthFormProps {
	type: 'login' | 'register';
}

export const AuthForm: React.FunctionComponent<AuthFormProps> = ({ type }) => {
	const navigate = useNavigate();
	const { data: storeUser, getUser } = useUserStore();
	const validate = validateFormValues(authSchema);
	const toasts = useToast();

	const onSubmit = (values: AuthData): void => {
		tryCatch(async () => {
			if (type === 'login') {
				await authService.login(values);
				getUser();
				navigate(ROUTER_KEYS.HOME);
			} else {
				await authService.register(values);
				navigate(ROUTER_KEYS.AUTH.LOGIN);
			}
		}, toasts);
	};

	useEffect(() => {
		if (storeUser) navigate(ROUTER_KEYS.HOME);
	}, [storeUser]);

	return (
		<Flex bg="gray.100" align="center" justify="center" h="100vh">
			<Box
				bg="white"
				p={6}
				rounded="md"
				w={{ base: '100%', sm: '75%', md: '25%' }}
			>
				<Form
					onSubmit={onSubmit}
					validate={validate}
					render={({ handleSubmit, submitting }) => (
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="flex-start">
								<Heading
									size={'md'}
									color="purple"
									textTransform={'uppercase'}
								>
									{type === 'login' ? 'sign in' : 'sign up'}
								</Heading>
								<FormInput
									name="email"
									placeholder="Email"
									Component={Input}
									label="Email Address"
								/>
								{type === 'register' && (
									<FormInput
										name="name"
										placeholder="Name"
										Component={Input}
										label="Name"
									/>
								)}
								<FormInput
									name="password"
									placeholder="Password"
									Component={Input}
									label="Password"
									type="password"
								/>
								<HStack
									justifyContent={'space-between'}
									width={'100%'}
								>
									<Link
										className="text-sm text-gray-400"
										to={ROUTER_KEYS.AUTH.REQ_RESET_PASSWORD}
									>
										Forger password?
									</Link>
									<Link
										className="text-sm text-gray-400"
										to={
											type === 'login'
												? ROUTER_KEYS.AUTH.SIGN_UP
												: ROUTER_KEYS.AUTH.LOGIN
										}
									>
										{type === 'login'
											? 'Create account'
											: 'Login'}
									</Link>
								</HStack>
								<Button
									type="submit"
									colorScheme="purple"
									width="fit-content"
									alignSelf={'center'}
									isLoading={submitting}
								>
									{type === 'login'
										? 'Login'
										: 'Create account'}
								</Button>
							</VStack>
						</form>
					)}
				/>
			</Box>
		</Flex>
	);
};
