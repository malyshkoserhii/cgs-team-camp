import React from 'react';
import {
	VStack,
	Input,
	Button,
	Box,
	Flex,
	Heading,
	useToast,
} from '@chakra-ui/react';
import { isMobile, isMobileOnly } from 'react-device-detect';
import { useNavigate } from 'react-router';

import { ResetPasswordData } from '../../../types/auth/auth.types';
import { resetSchema } from './validation.schema';
import authService from '../auth.service';
import { showInfoToast } from '../../form.toasts';
import { Form } from 'react-final-form';
import { FormInput } from '~shared/components/ui/form/form-input';
import { tryCatch, validateFormValues } from '~/utils';
import { ROUTER_KEYS } from '~shared/keys';

export const ResetForm: React.FunctionComponent = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(document.location.search);
	const validate = validateFormValues(resetSchema);

	const onSubmit = (values: ResetPasswordData): void => {
		tryCatch(async () => {
			await authService.resetPassword(values);
			showInfoToast(toast, 'Password reset successfully');
			navigate(ROUTER_KEYS.AUTH.LOGIN);
		}, toast);
	};

	return (
		<Flex bg="gray.100" align="center" justify="center" h="100vh">
			<Box
				bg="white"
				p={6}
				rounded="md"
				w={isMobileOnly ? '100%' : isMobile ? '75%' : '25%'}
			>
				<Form
					onSubmit={onSubmit}
					validate={validate}
					initialValues={{
						userId: Number(searchParams.get('id')),
						token: searchParams.get('token') || '',
						password: '',
					}}
					render={({ handleSubmit, submitting }) => (
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="flex-start">
								<Heading
									size={'md'}
									color="purple"
									textTransform={'uppercase'}
								>
									Write new password
								</Heading>
								<FormInput
									name="password"
									placeholder="Password"
									Component={Input}
									label="Password"
									type="password"
								/>
								<Button
									type="submit"
									colorScheme="purple"
									width="fit-content"
									alignSelf={'center'}
									isLoading={submitting}
								>
									Reset
								</Button>
							</VStack>
						</form>
					)}
				/>
			</Box>
		</Flex>
	);
};
