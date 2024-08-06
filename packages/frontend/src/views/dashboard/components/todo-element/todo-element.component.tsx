import React, { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Switch } from '@blueprintjs/core';

import {
	Cell,
	Row,
	ActionsContainer,
} from '~shared/components/table/grid-table.component';
import { ROUTER_KEYS } from '~shared/keys';
import { showTodoStatus } from '~/utils/showTodoStatus';
import { useAuthStore } from '~store/auth.store';

import {
	todoElementDesktop,
	todoElementTablet,
	todoElementMobile,
	actionButtonsTablet,
} from './todo-element.styles';

import { TodoStatus, Todo } from '~typings/todo';

type TodoElementProps = {
	todo: Todo;
	handleUpdateTodo: (values: Todo) => void;
	handleDeleteTodo: (id: string) => void;
};

const TodoElement: FC<TodoElementProps> = ({
	todo,
	handleUpdateTodo,
	handleDeleteTodo,
}) => {
	const navigate = useNavigate();

	const { userId } = useAuthStore();
	const { id, name, description, status } = todo;

	const isCreator = useMemo(
		() => (todo ? userId === todo.userId : false),
		[userId, todo],
	);
	const handleStatusChange = useCallback(() => {
		const newStatus =
			status === TodoStatus.Completed
				? TodoStatus.InProgress
				: TodoStatus.Completed;
		handleUpdateTodo({ ...todo, status: newStatus });
	}, [status, handleUpdateTodo]);

	const ActionButtonsGroup = () => (
		<>
			<Button
				intent="primary"
				onClick={() => navigate(`${ROUTER_KEYS.TODO}/${id}`)}
			>
				View
			</Button>
			{isCreator && (
				<Button intent="danger" onClick={() => handleDeleteTodo(id)}>
					Delete
				</Button>
			)}
			<Switch
				checked={status === TodoStatus.Completed}
				label={showTodoStatus(status)}
				disabled={!isCreator}
				onChange={handleStatusChange}
			/>
		</>
	);

	return (
		<>
			<div className={todoElementDesktop}>
				<Row>
					<Cell>{name}</Cell>
					<Cell>{description}</Cell>
					<ActionsContainer>
						<ActionButtonsGroup />
					</ActionsContainer>
				</Row>
			</div>
			<div className={todoElementTablet}>
				<h2>{name}</h2>
				<p>{description}</p>
				<div className={actionButtonsTablet}>
					<ActionButtonsGroup />
				</div>
			</div>
			<div className={todoElementMobile}>
				<h2>{name}</h2>
				<p>{description}</p>
				<div className={actionButtonsTablet}>
					<ActionButtonsGroup />
				</div>
			</div>
		</>
	);
};

export default TodoElement;
