// src/components/TodoPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoElement from '~modules/todo/components/TodoElement/TodoElement.component';
import { useTodoStore } from '~store/todoStore';
import { useMediaQuery } from 'react-responsive';
import {
	ListWrapper,
	SliderWrapper,
	TableWrapper,
	TodoListWrapper,
} from './TodoMainPage.styles';
import { ROUTER_KEYS } from '~shared/keys/router-keys';
import Button from '~shared/components/button/button.component';
import { buttonContainerStyles } from '../TodoPage.styles';

const TodoPage: React.FC = () => {
	const { todos, fetchTodos } = useTodoStore();
	const navigate = useNavigate();

	const isDesktop = useMediaQuery({ minWidth: 1024 });
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	const handleAddTodoClick = (): void => {
		navigate(ROUTER_KEYS.ADD_TODO);
	};

	const handleTodoClick = (id: number): void => {
		navigate(ROUTER_KEYS.TODO + `/${id}`);
	};

	return (
		<TodoListWrapper>
			{isDesktop && (
				<TableWrapper>
					<thead>
						<tr>
							<th>Title</th>
							<th>Description</th>
							<th>Completed</th>
						</tr>
					</thead>
					<tbody>
						{todos.map((todo, index) => (
							<tr
								key={index}
								onClick={() => handleTodoClick(todo.id)}
							>
								<td>{todo.title}</td>
								<td>{todo.description}</td>
								<td>{todo.completed ? 'Yes' : 'No'}</td>
							</tr>
						))}
					</tbody>
				</TableWrapper>
			)}
			{isTablet && (
				<SliderWrapper>
					{todos.map((todo, index) => (
						<div
							key={index}
							onClick={() => handleTodoClick(todo.id)}
						>
							<TodoElement
								key={index}
								id={todo.id}
								title={todo.title}
								description={todo.description}
								completed={todo.completed}
								onClick={() => handleTodoClick(todo.id)}
							/>
						</div>
					))}
				</SliderWrapper>
			)}
			{isMobile && (
				<ListWrapper>
					{todos.map((todo, index) => (
						<li
							key={index}
							onClick={() => handleTodoClick(todo.id)}
						>
							<TodoElement
								key={index}
								id={todo.id}
								title={todo.title}
								description={todo.description}
								completed={todo.completed}
								onClick={() => handleTodoClick(todo.id)}
							/>
						</li>
					))}
				</ListWrapper>
			)}
			<div className={buttonContainerStyles}>
				<Button text="Add Todo" onClick={handleAddTodoClick} />
			</div>
		</TodoListWrapper>
	);
};

export default TodoPage;
