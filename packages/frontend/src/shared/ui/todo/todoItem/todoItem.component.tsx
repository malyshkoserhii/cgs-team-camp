import { forwardRef, ReactElement, Ref } from 'react';
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
import {
	headingActionsStyle,
	headingDescriptionStyle,
	headingStatusStyle,
	headingTitleStyle,
	privacyStyle,
	todoBoxStyles,
	todoRowContainerStyles,
} from './todoItem.styles';
import { TodoItemCard } from './todoItemCard.component';

type TodoItemProps = TodoI & {
	ref?: Ref<HTMLDivElement>;
};

export const TodoItem = forwardRef<HTMLLIElement, TodoItemProps>(
	(todo, ref): ReactElement => {
		const { description, name, id, isPrivate } = todo;
		const openModal = useModalStore((state) => state.openModal);
		const {
			deleteTodoById,
			changeStatusById,
			changeStatusIsLoading,
			deleteIsLoading,
		} = useTodoStore();
		const { user } = useAuth();
		const isMobileAndTablet = useMediaQuery({
			query: `(max-width: ${breakpoints.lg})`,
		});
		const isUsersTodo = !user?.todos?.find((elId) => elId === id);

		const onUpdateStatus = async (): Promise<void> => {
			await changeStatusById(
				String(todo.id),
				todo.status === TodoStatusE.Completed
					? TodoStatusE.InProgress
					: TodoStatusE.Completed,
			);
		};

		const onDelete = async (id: string): Promise<void> => {
			await deleteTodoById(id);
		};

		const onOpenModal = (): void => {
			openModal({
				children: <TodoForm variant="noStyle" isEdit todo={todo} />,
			});
		};

		if (isMobileAndTablet) {
			return (
				<TodoItemCard
					ref={ref}
					isUsersTodo={isUsersTodo}
					todo={todo}
					onUpdateStatus={onUpdateStatus}
					onOpenModal={onOpenModal}
					onDelete={onDelete}
					isPrivate={isPrivate}
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
				align="center"
			>
				<Flex
					gap="25px"
					justify="flex-start"
					align="center"
					direction={isMobileAndTablet ? 'column' : 'row'}
					className={todoRowContainerStyles}
				>
					<Flex align="flex-start" className={headingStatusStyle}>
						<Switch
							onChange={onUpdateStatus}
							disabled={changeStatusIsLoading || isUsersTodo}
							checked={todo.status === TodoStatusE.Completed}
						/>
					</Flex>
					<Flex className={headingTitleStyle}>
						<Text size="small">{name}</Text>
					</Flex>
					<Flex className={headingDescriptionStyle}>
						<Text size="small">{description}</Text>
					</Flex>
					<Flex className={privacyStyle}>
						{isPrivate ? (
							<Button
								toolTipMessage="Private task."
								variant="clear"
								icon="lock"
								fullWidth={false}
							/>
						) : (
							<Button
								toolTipMessage="Public task."
								variant="clear"
								fullWidth={false}
								icon="eye-open"
							/>
						)}
					</Flex>
				</Flex>
				<Flex align="flex-end" className={headingActionsStyle}>
					<Flex gap="10px" align="center">
						<Button
							disabled={isUsersTodo}
							fullWidth={false}
							icon="edit"
							onClick={onOpenModal}
						/>
						<Button
							toolTipMessage="Delete task"
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
	},
);
