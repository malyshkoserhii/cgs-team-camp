import React from 'react';
import { Link } from 'react-router-dom';
import Button from '~shared/components/button/button.component';
import { ROUTER_KEYS } from '~shared/keys';
import { Todo } from '~shared/types/Todo.types';
import { TodoLink } from './TodoItem.styles';
export type TodoItemActionsProps = {
	todo: Todo;
	removeTodo: (id: number) => void;
	updateTodo?: () => void;
	additional?: string;
};
export const TodoItemActions = ({ todo, removeTodo }): React.JSX.Element => {
	return (
		<>
			<Link
				to={`${ROUTER_KEYS.DASHBOARD}/${todo.id}`}
				className={TodoLink}
			>
				View
			</Link>
			<Button
				text={'Delete'}
				onClick={() => removeTodo(todo.id)}
				type="button"
			/>
		</>
	);
};
