import React from 'react';
import { TodoElement } from '../../../TodoItem/TodoItem';
import { Todo } from '~shared/types/todo.type';
import { tableStyles, headerStyles } from './TableView.styles';

interface TableViewProps {
	todos: Todo[];
	userId: number;
}

export const TableView: React.FC<TableViewProps> = ({ todos, userId }) => (
	<div className={tableStyles}>
		<div className={headerStyles}>
			<span>Title</span>
			<span>Description</span>
			<span>Actions</span>
		</div>
		{todos.map((todo) => (
			<TodoElement
				key={todo.id}
				todo={todo}
				view="table"
				editable={todo.userId === userId}
			/>
		))}
	</div>
);
