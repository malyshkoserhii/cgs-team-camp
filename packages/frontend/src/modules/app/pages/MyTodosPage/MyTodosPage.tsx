import React, { useEffect } from 'react';
import { TodoList } from '../../components/TodoList/TodoList';
import { useTodoStore } from '~store/todo.store';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { buttonGroup } from '../TodosPage/TodosPage.styles';
import { FILTER_TYPES } from '~shared/keys';
import Loader from '~shared/components/loader/loader.component';

export const MyTodosPage: React.FC = () => {
	const { fetchMyTodos, isLoading, error } = useTodoStore();
	const [filter, setFilter] = React.useState<FILTER_TYPES>(FILTER_TYPES.ALL);

	useEffect(() => {
		fetchMyTodos();
	}, [fetchMyTodos]);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<ButtonGroup large className={buttonGroup}>
				<Button
					icon="globe"
					onClick={() => setFilter(FILTER_TYPES.ALL)}
					active={filter === FILTER_TYPES.ALL}
				>
					All
				</Button>
				<Button
					icon="person"
					onClick={() => setFilter(FILTER_TYPES.PRIVATE)}
					active={filter === FILTER_TYPES.PRIVATE}
				>
					Private
				</Button>
				<Button
					icon="people"
					onClick={() => setFilter(FILTER_TYPES.PUBLIC)}
					active={filter === FILTER_TYPES.PUBLIC}
				>
					Public
				</Button>
				<Button
					icon="tick"
					onClick={() => setFilter(FILTER_TYPES.COMPLETED)}
					active={filter === FILTER_TYPES.COMPLETED}
				>
					Completed
				</Button>
			</ButtonGroup>
			<div>
				<TodoList filter={filter} editable={true} />
			</div>
		</div>
	);
};
