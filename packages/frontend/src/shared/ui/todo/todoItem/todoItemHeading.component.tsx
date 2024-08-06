import { ReactElement } from 'react';
import { Flex } from '~shared/ui/base/flex';
import { Text } from '~shared/ui/base/text';
import {
	headingActionsStyle,
	headingDescriptionStyle,
	headingStatusStyle,
	headingTitleStyle,
	privacyStyle,
	todoBoxStyles,
	todoRowContainerStyles,
} from './todoItem.styles';

export const TodoItemHeading = (): ReactElement => {
	return (
		<Flex
			as="li"
			className={todoBoxStyles}
			justify="space-between"
			align="center"
		>
			<Flex
				gap="25px"
				justify="flex-start"
				align="center"
				className={todoRowContainerStyles}
			>
				<Flex
					direction="column"
					align="flex-start"
					className={headingStatusStyle}
				>
					<Text size="small">Status</Text>
				</Flex>
				<Flex
					direction="column"
					align="flex-start"
					className={headingTitleStyle}
				>
					<Text size="small">Title</Text>
				</Flex>
				<Flex
					direction="column"
					align="flex-start"
					className={headingDescriptionStyle}
				>
					<Text size="small">Description</Text>
				</Flex>
				<Flex className={privacyStyle}>
					<Text size="small">Privacy</Text>
				</Flex>
			</Flex>
			<Flex
				direction="column"
				align="flex-end"
				className={headingActionsStyle}
			>
				<Text size="small">Actions</Text>
			</Flex>
		</Flex>
	);
};
