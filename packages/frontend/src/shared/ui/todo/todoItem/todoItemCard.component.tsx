import { ReactElement } from 'react';
import { TodoStatusE } from '~shared/enums/TodoStatus.enum';
import { TodoI } from '~shared/interfaces/todo.interface';
import { Flex } from '~shared/ui/base/flex';
import { Heading } from '~shared/ui/base/heading';
import { Text } from '~shared/ui/base/text';
import Button from '~shared/ui/button/button.component';
import { Switch } from '~shared/ui/switch';
import {
	actionsBoxStyles,
	todoBoxStyles,
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
};

export const TodoItemCard = ({
	todo,
	onUpdateStatus,
	onOpenModal,
	onDelete,
	changeStatusIsLoading,
	deleteIsLoading,
	isUsersTodo,
}: TodoItemCardProps): ReactElement => {
	return (
		<li className={todoBoxStyles}>
			<Heading level={3} size="small" className={todoCardHeading}>
				{todo.name}
			</Heading>
			<Text size="medium" align="left">
				{todo.description}
			</Text>
			<Flex
				gap="10px"
				justify="space-between"
				align="baseline"
				className={actionsBoxStyles}
			>
				<Flex gap="10px">
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
				<Switch
					onChange={onUpdateStatus}
					disabled={changeStatusIsLoading || isUsersTodo}
					checked={todo.status === TodoStatusE.Completed}
				/>
			</Flex>
		</li>
	);
};
