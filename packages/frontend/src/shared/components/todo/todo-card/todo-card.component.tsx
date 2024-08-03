import React from 'react';
import {
	Card,
	CardBody,
	Stack,
	Heading,
	Divider,
	CardFooter,
	ButtonGroup,
	Button,
	Text,
	CardProps,
	Checkbox,
	HStack,
} from '@chakra-ui/react';

import { ITodo } from '../../../types/todo/todo.types';
import { CHAKRA, COLORS } from '../../../../theme';

interface TodoListProps extends CardProps {
	todo: ITodo;
	editClick: () => void;
}

export const TodoListCard: React.FunctionComponent<TodoListProps> = ({
	editClick,
	todo,
	...cardProps
}) => (
	<Card {...cardProps}>
		<CardBody>
			<Stack mt="6" spacing="2">
				<Heading padding="0 .4em" size="md">
					{todo.title}
				</Heading>
				<Text
					minHeight="100px"
					borderRadius={CHAKRA.RADIUS.md}
					padding=".4em .6em"
					border={`1px solid ${COLORS.gray}`}
					bgColor="whitesmoke"
				>
					{todo.description}
				</Text>
			</Stack>
			<HStack
				width="80%"
				padding=".4em"
				justifyContent="space-between"
				margin="auto"
				fontSize="x-large"
			>
				<Checkbox
					id="completed"
					pointerEvents="none"
					name="completed"
					isChecked={todo.completed}
					colorScheme="green"
				>
					Completed
				</Checkbox>
				<Checkbox
					id="private"
					name="private"
					pointerEvents="none"
					isChecked={todo.private}
					colorScheme="blue"
				>
					Private
				</Checkbox>
			</HStack>
		</CardBody>
		<Divider />
		<CardFooter justifyContent="center">
			<ButtonGroup width="40%" spacing="2">
				<Button
					onClick={editClick}
					width="100%"
					variant="solid"
					colorScheme="teal"
				>
					EDIT
				</Button>
			</ButtonGroup>
		</CardFooter>
	</Card>
);
