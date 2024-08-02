import { Dialog, DialogBody } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AddTodoSchema } from '~shared/schemas/todo.schema';
import { UpdateTodoType } from '~shared/types/Todo.types';
import { useTodoStore } from '~store/todos.store';
import { DialogContainer } from '../TodoForm/Form.styles';
import { AddTodoForm } from '../TodoForm/TodoForm';
import TodoItem from '../TodoItem/TodoItem';
import { BigTodoContainer } from '../TodoItem/TodoItem.styles';
import { TodopageTitle } from './TodoPage.styles';

const TodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const removeTodo = useTodoStore((state) => state.removeTodo);
	const updateTodo = useTodoStore((state) => state.updateTodo);
	const { todos, todo, getTodoById } = useTodoStore();
	const [openModal, setOpenaModal] = useState(false);
	useEffect(() => {
		getTodoById(+id);
	}, [todos]);

	const closeUpdateModal = (): void => {
		setOpenaModal(false);
	};
	const openUpdateModal = (): void => {
		setOpenaModal(true);
	};

	const updateTodoFunc = (todo: UpdateTodoType): void => {
		updateTodo(+id, todo);
		closeUpdateModal();
	};

	return (
		<div>
			<h2 className={TodopageTitle}>View or Edit Todo with ID: {id}</h2>
			{todo && (
				<TodoItem
					todo={todo}
					removeTodo={removeTodo}
					updateTodo={openUpdateModal}
					additional={BigTodoContainer}
				/>
			)}
			<Dialog
				onClose={closeUpdateModal}
				isOpen={openModal}
				title="Edit Todo"
				className={DialogContainer}
				canEscapeKeyClose={false}
				canOutsideClickClose={false}
			>
				<DialogBody>
					{
						<AddTodoForm
							onSubmit={updateTodoFunc}
							todo={todo}
							schema={AddTodoSchema}
							SubmitButtonText="Update Todo"
						/>
					}
				</DialogBody>
			</Dialog>
		</div>
	);
};

export default TodoPage;
