import { CreateToastFnReturn } from '@chakra-ui/react';
import { ERRORS } from '~shared/keys';

export const showErrorToast = (toast: CreateToastFnReturn): void => {
	toast({
		title: 'Error',
		description: 'Unexpected error from server',
		status: 'error',
		duration: 5000,
		isClosable: true,
		position: 'top',
	});
};

export const showErrorToastWithText = (
	toast: CreateToastFnReturn,
	text: string,
): void => {
	toast({
		title: 'Error',
		description: ERRORS[text as keyof typeof ERRORS],
		status: 'error',
		duration: 5000,
		isClosable: true,
		position: 'top',
	});
};

export const showInfoToast = (
	toast: CreateToastFnReturn,
	text: string,
): void => {
	toast({
		title: text,
		status: 'info',
		duration: 5000,
		isClosable: true,
		position: 'top',
	});
};
