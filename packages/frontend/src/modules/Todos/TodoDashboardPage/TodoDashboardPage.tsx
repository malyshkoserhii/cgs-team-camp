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

import Button from '~shared/components/button/button.component';
import { AddTodoSchema } from '~shared/schemas/todo.schema';
import { useTodoStore } from '~store/todos.store';
import { TabletDashboard } from '../Tododashboard/TodoTabletDashboard/TodoTabletDashboard';
import { PageLoader } from './TodoDashboardPage.styles';

const TodoDashboardPage = (): JSX.Element => {
	const [openModal, setOpenModal] = React.useState(false);
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
	const error = todoStore.error;
	const todos = todoStore.todos;

	React.useEffect(() => {
		todoStore.fetchTodos();
	}, []);
	const openAddToDoModal = (): void => {
		setOpenModal(true);
	};

	const closeAddToDoModal = (): void => {
		setOpenModal(false);
	};

	const createTodo = (todo: Todo): void => {
		todoStore.addTodo(todo);
		closeAddToDoModal();
	};

	const removeTodo = (id: number): void => {
		todoStore.removeTodo(id);
	};

	const showContent = !error && !loading;

	return (
		<>
			<Button text="Create New Todo" onClick={openAddToDoModal} />
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
