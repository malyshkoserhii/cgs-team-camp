import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface FormButtonProps extends ButtonProps {
	color: string;
	onClick(): void;
}

export const FormButton: React.FunctionComponent<FormButtonProps> = ({
	color,
	onClick,
	children,
}) => {
	return (
		<Button colorScheme={color} width="full" onClick={onClick}>
			{children}
		</Button>
	);
};
