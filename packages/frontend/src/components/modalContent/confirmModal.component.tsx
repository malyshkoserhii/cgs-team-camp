import { ReactElement } from 'react';
import { Flex } from '~shared/ui/base/flex';
import { Text } from '~shared/ui/base/text';
import Button from '~shared/ui/button/button.component';

type Props = {
	onConfirm: () => void;
	onCancel: () => void;
	message?: string;
};

export const ConfirmationForm = ({
	onCancel,
	onConfirm,
	message,
}: Props): ReactElement => {
	return (
		<Flex gap="10px" direction="column">
			<Text bold>{message}</Text>
			<Flex gap="50px">
				<Button onClick={onCancel} variant="outline">
					Cancel
				</Button>
				<Button onClick={onConfirm} variant="filled">
					Confirm
				</Button>
			</Flex>
		</Flex>
	);
};
