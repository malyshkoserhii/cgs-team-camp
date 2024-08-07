import React, { useEffect, useState } from 'react';
import { TodoList } from '../../components/TodoList/TodoList';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';
import { ButtonGroup, Button, Spinner } from '@blueprintjs/core';
import { buttonGroup } from './TodosPage.styles';
import { FILTER_TYPES } from '~shared/keys';

export const TodosPage: React.FC = () => {
	const {
		todos,
		fetchTodos,
		isLoading: todoLoading,
		error: todoError,
	} = useTodoStore();
	const {
		user,
		getUser,
		error: userError,
		isLoading: userLoading,
	} = useUserStore();
	const [filter, setFilter] = useState<FILTER_TYPES>(FILTER_TYPES.ALL);

	useEffect(() => {
		const loadInitialData = async (): Promise<void> => {
			await Promise.all([fetchTodos(), getUser()]);
		};

		loadInitialData();
	}, [fetchTodos, getUser]);

	if (!user || !todos) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<Spinner size={50} />
			</div>
		);
	}

	if (todoError || userError) {
		return <div>Error: {todoError || userError}</div>;
	}

	return (
		<div>
			<ButtonGroup className={buttonGroup}>
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
				{todoLoading || userLoading ? (
					<Spinner size={20} />
				) : (
					<TodoList filter={filter} />
				)}
			</div>
		</div>
	);
};
