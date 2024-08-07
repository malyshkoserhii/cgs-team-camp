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
import { Form } from 'react-final-form';
import { FormInput } from '~shared/components/ui/form/form-input';
import { tryCatch, validateFormValues } from '~/utils';
import { reqResetSchema } from './validation.schema';
import { ReqResetPasswordData } from '~shared/types/auth/auth.types';
import authService from '../auth.service';
import { showInfoToast } from '~shared/components/form.toasts';

export const ReqResetForm: React.FunctionComponent = () => {
	const validate = validateFormValues(reqResetSchema);
	const toasts = useToast();
	const onSubmit = (values: ReqResetPasswordData): void => {
		tryCatch(async () => {
			await authService.reqResetPassword(values);
			showInfoToast(toasts, 'Reset password link sent');
		}, toasts);
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
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<VStack spacing={4} align="flex-start">
								<Heading
									size={'md'}
									color="purple"
									textTransform={'uppercase'}
								>
									Reset password
								</Heading>
								<FormInput
									name="email"
									placeholder="Email"
									Component={Input}
									label="Email"
								/>
								<Button
									type="submit"
									colorScheme="purple"
									width="fit-content"
									alignSelf={'center'}
								>
									Send mail with reset-link
								</Button>
							</VStack>
						</form>
					)}
				/>
			</Box>
		</Flex>
	);
};
