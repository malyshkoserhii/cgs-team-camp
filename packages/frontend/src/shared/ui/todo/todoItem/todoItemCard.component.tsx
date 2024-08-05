import { ReactElement } from 'react';
import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { TodoI } from '~shared/interfaces/todo.interface';
import { Flex } from '~shared/ui/base/flex';
import { Heading } from '~shared/ui/base/heading';
import { Text } from '~shared/ui/base/text';
import Button from '~shared/ui/button/button.component';
import { Switch } from '~shared/ui/switch';
import {
	todoBoxStyles,
	todoCardContentStyle,
	todoCardHeading,
} from './todoItem.styles';

type TodoItemCardProps = {
	todo: TodoI;
	onUpdateStatus: () => void;
	onOpenModal: () => void;
	onDelete: (id: string) => void;
	changeStatusIsLoading: boolean;
	deleteIsLoading: boolean;
	isMobileAndTablet: boolean;
	isUsersTodo: boolean;
	isPrivate: boolean;
};

export const TodoItemCard = ({
	todo,
	onUpdateStatus,
	onOpenModal,
	onDelete,
	changeStatusIsLoading,
	deleteIsLoading,
	isUsersTodo,
	isPrivate,
}: TodoItemCardProps): ReactElement => {
	return (
		<li className={todoBoxStyles}>
			<div>
				<Flex>
					<Heading level={3} size="small" className={todoCardHeading}>
						{todo.name}
					</Heading>
					{isPrivate ? (
						<Button
							variant="clear"
							fullWidth={false}
							text="Private"
						/>
					) : (
						<Button
							variant="clear"
							fullWidth={false}
							text="Public"
						/>
					)}
				</Flex>
				<Text size="medium" align="left">
					{todo.description}
				</Text>
			</div>
			<div className={todoCardContentStyle}>
				<Flex justify="space-between">
					<Text size="medium" align="left">
						Competed
					</Text>
					<Switch
						onChange={onUpdateStatus}
						disabled={changeStatusIsLoading || isUsersTodo}
						checked={todo.status === TodoStatusE.Completed}
					/>
				</Flex>
				<Flex gap="10px" justify="flex-end">
					<Button
						fullWidth={false}
						text="Edit"
						onClick={onOpenModal}
						disabled={isUsersTodo}
					/>
					<Button
						onClick={() => onDelete(String(todo.id))}
						loading={deleteIsLoading}
						variant="outline"
						fullWidth={false}
						text="Delete"
						disabled={isUsersTodo}
					/>
				</Flex>
			</div>
		</li>
	);
};
