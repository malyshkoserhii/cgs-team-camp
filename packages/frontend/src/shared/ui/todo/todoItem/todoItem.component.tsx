import { ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { TodoForm } from '~/components/todoForm';
import { TodoI } from '~shared/interfaces/todo.interface';
import { breakpoints } from '~shared/styles/breakpoints';
import { Flex } from '~shared/ui/base/flex';
import { Text } from '~shared/ui/base/text';
import Button from '~shared/ui/button/button.component';
import useModalStore from '~store/modal.store';

export const TodoItem = (todo: TodoI): ReactElement => {
	const { description, name } = todo;
	const openModal = useModalStore((state) => state.openModal);

	const handleOpenModal = (): void => {
		openModal({
			children: <TodoForm variant="noStyle" isEdit todo={todo} />,
		});
	};
	const isMobileAndTablet = useMediaQuery({
		query: `(max-width: ${breakpoints.lg})`,
	});

	return (
		<Flex
			as="li"
			justify="space-between"
			direction={isMobileAndTablet ? 'column' : 'row'}
		>
			<Flex
				gap="25px"
				justify="flex-start"
				align="center"
				direction={isMobileAndTablet ? 'column' : 'row'}
			>
				<Flex direction="column" gap="5px">
					<Text size="small">Title</Text>
					<Text size="small">{name}</Text>
				</Flex>
				<Flex direction="column" gap="5px">
					<Text size="small">Description</Text>
					<Text size="small">{description}</Text>
				</Flex>
			</Flex>
			<Flex direction="column" gap="10px">
				<Text size="small">Actions</Text>
				<Flex gap="10px">
					<Button
						fullWidth={false}
						icon="edit"
						onClick={handleOpenModal}
					/>
					<Button variant="outline" fullWidth={false} icon="delete" />
				</Flex>
			</Flex>
		</Flex>
	);
};
