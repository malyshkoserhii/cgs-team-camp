import React, { FC, useCallback, useMemo, useState } from 'react';
import { Button } from '@blueprintjs/core';

import {
	Container,
	Row,
	Heading,
} from '~shared/components/table/grid-table.component';
import TodoElement from '../todo-element/todo-element.component';
import Carousel from '~shared/components/carousel/carousel.component';

import {
	desktopContainer,
	mobileContainer,
	tabletContainer,
} from './todo-container.styles';

import type { Todo } from '~typings/todo';

type TodoContainerProps = {
	todos: Todo[];
	totalCount: number;
	currentPage: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	handleUpdateTodo: (values: Todo) => void;
	handleDeleteTodo: (id: string) => void;
};

const TodoContainer: FC<TodoContainerProps> = ({
	todos,
	totalCount,
	currentPage,
	pageSize,
	onPageChange,
	handleUpdateTodo,
	handleDeleteTodo,
}) => {
	const totalPages = Math.ceil(totalCount / pageSize);
	const [initialSlide, setInitialSlide] = useState(0);

	if (!todos || todos.length === 0) {
		return <p>No todos available</p>;
	}

	const handlePrevPage = useCallback(() => {
		if (currentPage > 1) {
			setInitialSlide(pageSize - 1);
			onPageChange(currentPage - 1);
		}
	}, [currentPage, onPageChange, pageSize]);

	const handleNextPage = useCallback(() => {
		if (currentPage < totalPages) {
			setInitialSlide(0);
			onPageChange(currentPage + 1);
		}
	}, [currentPage, totalPages, onPageChange]);

	const renderDesktopPagination = useCallback(() => {
		return (
			<div>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(
					(pageNum) => (
						<Button
							key={pageNum}
							onClick={() => onPageChange(pageNum)}
							disabled={pageNum === currentPage}
						>
							{pageNum}
						</Button>
					),
				)}
			</div>
		);
	}, [onPageChange, currentPage, totalPages]);

	const todoElements = useMemo(
		() =>
			todos.map((todo) => (
				<TodoElement
					key={todo.id}
					todo={todo}
					handleUpdateTodo={handleUpdateTodo}
					handleDeleteTodo={handleDeleteTodo}
				/>
			)),
		[todos, handleUpdateTodo, handleDeleteTodo],
	);

	return (
		<div>
			<div className={desktopContainer}>
				<Row>
					<Heading>Todo Name</Heading>
					<Heading>Description</Heading>
					<Heading>Actions</Heading>
				</Row>
				<Container>
					{todoElements}
					{renderDesktopPagination()}
				</Container>
			</div>
			<div className={tabletContainer}>
				<Carousel
					items={todoElements}
					currentPage={currentPage}
					totalPages={totalPages}
					onPrevPage={handlePrevPage}
					onNextPage={handleNextPage}
					initialSlide={initialSlide}
				/>
			</div>
			<div className={mobileContainer}>
				{currentPage > 1 && (
					<Button onClick={() => onPageChange(currentPage - 1)}>
						Show previous
					</Button>
				)}
				{todoElements}
				<Button onClick={() => onPageChange(currentPage + 1)}>
					Show next
				</Button>
			</div>
		</div>
	);
};

export default TodoContainer;
