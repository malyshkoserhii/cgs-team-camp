import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
	Container,
	Row,
	Heading,
} from '~shared/components/table/grid-table.component';
import TodoElement from '../todo-element/todo-element.component';

import 'swiper/css';

import {
	desktopContainer,
	mobileContainer,
	tabletContainer,
} from './todo-container.styles';

import type { Todo } from '~typings/todo';

type TodoContainerProps = {
	todos: Todo[];
	handleUpdateTodo: (values: Todo) => void;
	handleDeleteTodo: (id: string) => void;
};

const TodoContainer: FC<TodoContainerProps> = ({
	todos,
	handleUpdateTodo,
	handleDeleteTodo,
}) => {
	if (!todos || todos.length === 0) {
		return <p>No todos available</p>;
	}

	return (
		<div>
			<div className={desktopContainer}>
				<Row>
					<Heading>Todo Time</Heading>
					<Heading>Description</Heading>
					<Heading>Actions</Heading>
				</Row>
				<Container>
					{todos.map((todo) => (
						<TodoElement
							key={todo.id}
							todo={todo}
							handleUpdateTodo={handleUpdateTodo}
							handleDeleteTodo={handleDeleteTodo}
						/>
					))}
				</Container>
			</div>
			<div className={tabletContainer}>
				<Swiper spaceBetween={10} slidesPerView={1}>
					{todos.map((todo) => (
						<SwiperSlide key={todo.id}>
							<TodoElement
								todo={todo}
								handleUpdateTodo={handleUpdateTodo}
								handleDeleteTodo={handleDeleteTodo}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className={mobileContainer}>
				{todos.map((todo) => (
					<TodoElement
						key={todo.id}
						todo={todo}
						handleUpdateTodo={handleUpdateTodo}
						handleDeleteTodo={handleDeleteTodo}
					/>
				))}
			</div>
		</div>
	);
};

export default TodoContainer;
