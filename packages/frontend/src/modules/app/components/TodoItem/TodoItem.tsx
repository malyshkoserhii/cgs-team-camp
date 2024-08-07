import * as React from 'react';
import { useTodoStore } from '~store/todo.store';
import {
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
			{editable && (
				<>
					<Switch
						checked={todo.completed}
						onChange={handleComplete}
						label={todo.completed ? 'Completed' : 'Not Completed'}
					/>
					<div>
						<Button intent={Intent.PRIMARY} onClick={handleEdit}>
							Edit
						</Button>
						<Button intent={Intent.DANGER} onClick={handleDelete}>
							Delete
						</Button>
					</div>
				</>
			)}
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
