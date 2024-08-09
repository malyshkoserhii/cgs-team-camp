import * as React from 'react';
import { useTodoStore } from '~store/todo.store';
import {
	buttonsContainerStyles,
	cardStyles,
	listItemStyles,
	rowActionsStyles,
	tableCellStyles,
	tableRowStyles,
} from './TodoItem.styles';
import { Button, Switch, Intent } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { Todo } from '~shared/types/todo.type';
import { ViewType } from '~shared/types/view.type';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';

interface TodoElementProps {
	todo: Todo;
	view: ViewType;
	editable: boolean;
}

export const TodoElement: React.FC<TodoElementProps> = ({
	todo,
	view,
	editable,
}) => {
	const { updateTodo, deleteTodo } = useTodoStore();
	const navigator = useNavigate();
	const isPhone = useMediaQuery(`(max-width: ${THEME.BREAKPOINTS.MOBILE})`);

	const handleComplete = (): void => {
		const { id, ...rest } = todo;
		updateTodo(id, { ...rest, completed: !todo.completed });
	};

	const handleDelete = (): Promise<void> => deleteTodo(todo.id);

	const handleEdit = (): void => {
		navigator(ROUTER_KEYS.EDIT.replace(':id', todo.id.toString()));
	};

	const renderActions = (): React.JSX.Element => (
		<div className={rowActionsStyles}>
			<>
				<Switch
					checked={todo.completed}
					onChange={handleComplete}
					label={
						isPhone
							? undefined
							: todo.completed
								? 'Completed'
								: 'Not Completed'
					}
					disabled={!editable}
				/>
				{editable && (
					<div className={buttonsContainerStyles}>
						<Button
							intent={Intent.PRIMARY}
							onClick={handleEdit}
							icon={isPhone ? 'edit' : undefined}
							text={isPhone ? '' : 'Edit'}
						/>
						<Button
							intent={Intent.DANGER}
							onClick={handleDelete}
							icon={isPhone ? 'trash' : undefined}
							text={isPhone ? '' : 'Delete'}
						/>
					</div>
				)}
			</>
		</div>
	);

	if (view === 'table') {
		return (
			<div className={tableRowStyles}>
				<span className={tableCellStyles}>{todo.title}</span>
				<span className={tableCellStyles}>{todo.description}</span>
				<span className={tableCellStyles}>{renderActions()}</span>
			</div>
		);
	}

	if (view === 'card') {
		return (
			<div className={cardStyles}>
				<h3>{todo.title}</h3>
				<p>{todo.description}</p>
				{renderActions()}
			</div>
		);
	}

	return (
		<div className={listItemStyles}>
			<div>
				<h3>{todo.title}</h3>
				<p>{todo.description}</p>
			</div>
			{renderActions()}
		</div>
	);
};
