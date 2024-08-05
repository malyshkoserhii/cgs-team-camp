import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '~shared/components/button/button.component';
import CustomToggle from '~shared/components/toggle/toggle.component';
import { ROUTER_KEYS } from '~shared/keys/router-keys';
import { Todo } from '~shared/types/todo.types';

import {
	TodoButtonsContainer,
	TodoItemContainer,
	TodoLink,
	TodoSwitch,
	nonFocusable,
} from './TodoItem.styles';
import { TodoItemActions } from './TodoItemActions';

export type TodoItemProps = {
	todo: Todo;
	removeTodo: (id: number) => void;
	updateTodo?: () => void;
	additional?: string;
};
const TodoItem: React.FC<TodoItemProps> = ({
	todo,
	removeTodo,
	updateTodo,
	additional,
}) => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const deleteTodoAndGoToList = (): void => {
		removeTodo(todo.id);
		navigate(ROUTER_KEYS.DASHBOARD);
	};
	return (
		<li
			key={todo.id}
			className={`${TodoItemContainer} ${additional || ''}`}
		>
			<h3>{todo.title}</h3>
			<p>{todo.description}</p>
			<div className={TodoButtonsContainer}>
				{id ? (
					<>
						<Button
							text={'Edit'}
							onClick={updateTodo}
							type="button"
						/>
						<Link to={ROUTER_KEYS.DASHBOARD} className={TodoLink}>
							Back
						</Link>
						<Button
							text={'Delete'}
							onClick={deleteTodoAndGoToList}
							type="button"
						/>
					</>
				) : (
					<TodoItemActions todo={todo} removeTodo={removeTodo} />
				)}

				<div className={TodoSwitch}>
					<CustomToggle
						status={todo.isCompleted}
						readOnly={true}
						additionalStyles={nonFocusable}
					/>
				</div>
				<div className={TodoSwitch}>
					<CustomToggle
						status={todo.isPrivate}
						readOnly={true}
						additionalStyles={nonFocusable}
					/>
				</div>
			</div>
		</li>
	);
};

export default TodoItem;
