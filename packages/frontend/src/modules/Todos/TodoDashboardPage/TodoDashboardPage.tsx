import { Dialog, DialogBody } from '@blueprintjs/core';
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import Loader from '~shared/components/loader/loader.component';

import { BREAKPOINTS } from '~shared/styles';
import { Todo } from '~shared/types/todo.types';

import { DialogContainer } from '../TodoForm/Form.styles';
import { AddTodoForm } from '../TodoForm/TodoForm';
import TodoDesktopDashboard from '../Tododashboard/TodoDesktopDashboard/TodoDesktopDashboard';
import TodoList from '../Tododashboard/TodoMobileDashboard/TodoMobileDashboard';

import { useSearchParams } from 'react-router-dom';
import { AddTodoSchema } from '~shared/schemas/todo.schema';
import { useTodoStore } from '~store/todos.store';
import TodoPageBar from '../TodoPageBar/TodoPageBar';
import { TabletDashboard } from '../Tododashboard/TodoTabletDashboard/TodoTabletDashboard';
import { PageLoader } from './TodoDashboardPage.styles';

const TodoDashboardPage = (): JSX.Element => {
	const [openModal, setOpenModal] = React.useState(false);
	const [filterValue, setFilterValue] = React.useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const isPrivate = searchParams.get('isPrivate');
	const isCompleted = searchParams.get('isCompleted');
	const filter = searchParams.get('search');

	const isDesktop = useMediaQuery({
		minWidth: `${parseInt(BREAKPOINTS.desktop, 10) + 1}px`,
	});
	const isTablet = useMediaQuery({
		minWidth: `${parseInt(BREAKPOINTS.tablet, 10) + 1}px`,
		maxWidth: `${BREAKPOINTS.desktop}`,
	});
	const isMobile = useMediaQuery({ maxWidth: `${BREAKPOINTS.tablet}` });
	const todoStore = useTodoStore();
	const loading = todoStore.loading;
	const error = todoStore.todoError;
	const todos = todoStore.todos;
	const updateSearchParams = (
		params: Record<string, string | null>,
	): void => {
		const newSearchParams = new URLSearchParams(searchParams);
		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				newSearchParams.set(key, value);
			} else {
				newSearchParams.delete(key);
			}
		});
		setSearchParams(newSearchParams);
	};
	React.useEffect(() => {
		todoStore.fetchTodos({
			search: filter,
			isPrivate: isPrivate,
			isCompleted: isCompleted,
		});
	}, [filter, isPrivate, isCompleted]);
	const openAddToDoModal = (): void => {
		setOpenModal(true);
	};

	const closeAddToDoModal = (): void => {
		setOpenModal(false);
	};

	const createTodo = async (todo: Todo): Promise<void> => {
		await todoStore.addTodo(todo);
		closeAddToDoModal();
	};

	const removeTodo = async (id: number): Promise<void> => {
		await todoStore.removeTodo(id);
	};
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	): void => {
		const newFilterValue = e.target.value;
		setFilterValue(newFilterValue);
		updateSearchParams({ search: newFilterValue });
	};
	const handleFilterCompleted = (): void => {
		updateSearchParams({ isCompleted: 'true' });
	};

	const handleFilterPrivate = (): void => {
		updateSearchParams({ isPrivate: 'true' });
	};

	const handleFilterPublic = (): void => {
		updateSearchParams({ isPrivate: 'false' });
	};

	const showAllTodos = (): void => {
		setFilterValue('');
		setSearchParams('');
	};

	const showContent = !error && !loading;

	return (
		<>
			<TodoPageBar
				onAddTodo={openAddToDoModal}
				showAllTodos={showAllTodos}
				searchInputValue={filterValue}
				onSearchnputChange={handleInputChange}
				onFilterPrivate={handleFilterPrivate}
				onFilterCompleted={handleFilterCompleted}
				onFilterPublic={handleFilterPublic}
			/>
			{error && (
				<p>
					Something went wrong <>{error}</>
				</p>
			)}
			{loading && (
				<div className={PageLoader}>
					<Loader />
				</div>
			)}
			{showContent && todos && (
				<>
					{isTablet && (
						<TabletDashboard
							todos={todos}
							removeTodo={removeTodo}
							loading={loading}
						/>
					)}
					{isMobile && (
						<TodoList todos={todos} removeTodo={removeTodo} />
					)}
					{isDesktop && (
						<>
							<TodoDesktopDashboard
								todos={todos}
								removeTodo={removeTodo}
							/>
						</>
					)}
				</>
			)}

			<Dialog
				onClose={closeAddToDoModal}
				isOpen={openModal}
				title="Create Todo"
				className={DialogContainer}
				canEscapeKeyClose={false}
				canOutsideClickClose={false}
			>
				<DialogBody>
					<AddTodoForm onSubmit={createTodo} schema={AddTodoSchema} />
				</DialogBody>
			</Dialog>
		</>
	);
};

export default TodoDashboardPage;
