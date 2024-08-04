import React, { FC } from 'react';
import { Dialog } from '@blueprintjs/core';

import TodoForm from '~shared/forms/todo/todo.form';

import type { Todo } from '~typings/todo';

type TodoFormModalProps = {
	isOpen: boolean;
	initialValues?: Todo;
	onClose: () => void;
	onSubmit: (values: Todo) => void;
};

const TodoFormModal: FC<TodoFormModalProps> = ({
	isOpen,
	initialValues,
	onClose,
	onSubmit,
}) => {
	return (
		<Dialog isOpen={isOpen} onClose={onClose}>
			<TodoForm
				initialValues={initialValues}
				onClose={onClose}
				onSubmit={onSubmit}
			/>
		</Dialog>
	);
};

export default TodoFormModal;
