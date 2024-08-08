import React, { useEffect, useRef } from 'react';
import { TodoElement } from '../../../TodoItem/TodoItem';
import { Todo } from '~shared/types/todo.type';
import { STORAGE_KEYS } from '~shared/keys';
import { Button } from '@blueprintjs/core';
import { listStyles, paginationControlsStyles } from './ListView.styles';

interface ListViewProps {
	todos: Todo[];
	userId: number;
	onLoadMore: () => void;
	hasMoreTodos: boolean;
}

export const ListView: React.FC<ListViewProps> = ({
	todos,
	userId,
	onLoadMore,
	hasMoreTodos,
}) => {
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scrollToStoredIndex = (): void => {
			const storedIndex = localStorage.getItem(
				STORAGE_KEYS.LAST_TODO_INDEX,
			);
			if (storedIndex && listRef.current) {
				const index = parseInt(storedIndex, 10);
				if (index < todos.length) {
					const todoElement = listRef.current.children[
						index
					] as HTMLElement;
					if (todoElement) {
						todoElement.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						});
					}
				}
			}
		};

		scrollToStoredIndex();
	}, [todos]);

	const handleLoadMore = (): void => {
		onLoadMore();

		localStorage.setItem(
			STORAGE_KEYS.LAST_TODO_INDEX,
			(todos.length - 1).toString(),
		);
	};

	return (
		<>
			<div className={listStyles} ref={listRef}>
				{todos.map((todo) => (
					<div key={todo.id}>
						<TodoElement
							todo={todo}
							view="list"
							editable={todo.userId === userId}
						/>
					</div>
				))}
			</div>
			<div className={paginationControlsStyles}>
				<Button onClick={handleLoadMore} disabled={!hasMoreTodos}>
					Load More
				</Button>
			</div>
		</>
	);
};
