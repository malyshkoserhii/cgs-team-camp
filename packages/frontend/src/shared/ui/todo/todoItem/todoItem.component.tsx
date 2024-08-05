import { ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { TodoForm } from '~/components/todoForm';
import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { useAuth } from '~shared/hooks/useAuth.hook';
import { TodoI } from '~shared/interfaces/todo.interface';
import { breakpoints } from '~shared/styles/breakpoints';
import { Flex } from '~shared/ui/base/flex';
import { Text } from '~shared/ui/base/text';
import Button from '~shared/ui/button/button.component';
import { Switch } from '~shared/ui/switch';
import useModalStore from '~store/modal.store';
import { useTodoStore } from '~store/todos.store';
import { todoBoxStyles } from './todoItem.styles';
import { TodoItemCard } from './todoItemCard.component';

export const TodoItem = (todo: TodoI): ReactElement => {
	const { description, name, id } = todo;
	const openModal = useModalStore((state) => state.openModal);
	const {
		deleteTodoById,
		fetchTodos,
		changeStatusById,
		changeStatusIsLoading,
		deleteIsLoading,
	} = useTodoStore();
	const { user } = useAuth();
	const isMobileAndTablet = useMediaQuery({
		query: `(max-width: ${breakpoints.lg})`,
	});
	const isUsersTodo = !user?.todos?.some((elId) => elId === id);

	const onUpdateStatus = async (): Promise<void> => {
		await changeStatusById(
			String(todo.id),
			todo.status === TodoStatusE.Completed
				? TodoStatusE.InProgress
				: TodoStatusE.Completed,
		);
		fetchTodos();
	};

	const onDelete = async (id: string): Promise<void> => {
		await deleteTodoById(id);
		fetchTodos();
	};

	const onOpenModal = (): void => {
		openModal({
			children: <TodoForm variant="noStyle" isEdit todo={todo} />,
		});
	};

	if (isMobileAndTablet) {
		return (
			<TodoItemCard
				isUsersTodo={isUsersTodo}
				todo={todo}
				onUpdateStatus={onUpdateStatus}
				onOpenModal={onOpenModal}
				onDelete={onDelete}
				changeStatusIsLoading={false}
				deleteIsLoading={false}
				isMobileAndTablet={isMobileAndTablet}
			/>
		);
	}

	return (
		<Flex
			as="li"
			className={todoBoxStyles}
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
					<Switch
						onChange={onUpdateStatus}
						disabled={changeStatusIsLoading || isUsersTodo}
						checked={todo.status === TodoStatusE.Completed}
					/>
				</Flex>
				<Flex direction="column" gap="5px">
					<Text size="small">{name}</Text>
				</Flex>
				<Flex direction="column" gap="5px">
					<Text size="small">{description}</Text>
				</Flex>
			</Flex>
			<Flex direction="column" gap="10px">
				<Flex gap="10px">
					<Button
						disabled={isUsersTodo}
						fullWidth={false}
						icon="edit"
						onClick={onOpenModal}
					/>
					<Button
						disabled={isUsersTodo}
						onClick={() => onDelete(String(todo.id))}
						loading={deleteIsLoading}
						variant="outline"
						fullWidth={false}
						icon="delete"
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};
