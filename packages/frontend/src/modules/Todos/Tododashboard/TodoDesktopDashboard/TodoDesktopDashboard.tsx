import React from 'react';
import {
	TodoButtonsContainer,
	TodoSwitch,
	nonFocusable,
} from '~modules/Todos/TodoItem/TodoItem.styles';
import { TodoListProps } from '~modules/Todos/Tododashboard/TodoMobileDashboard/TodoMobileDashboard';

import { TodoItemActions } from '~modules/Todos/TodoItem/TodoItemActions';
import CustomToggle from '~shared/components/toggle/toggle.component';
import {
	ActionsColumn,
	DescriptionColumn,
	TableTitleColumn,
	tableStyles,
} from './TodoDesktopDashboard.styles';

const TodoDesktopDashboard: React.FC<TodoListProps> = ({
	todos,
	removeTodo,
}) => {
	return (
		<>
			<table className={tableStyles}>
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => (
						<tr key={todo.id}>
							<td className={TableTitleColumn}>{todo.title}</td>
							<td className={DescriptionColumn}>
								{todo.description}
							</td>
							<td className={ActionsColumn}>
								<div className={TodoButtonsContainer}>
									<TodoItemActions
										todo={todo}
										removeTodo={removeTodo}
									/>
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
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default TodoDesktopDashboard;
