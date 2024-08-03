import * as React from 'react';
import { TodoContainer } from '~modules/todo/todo-container/todo-container.component';
import { TodoForm } from '~modules/todo/todo-form/todo-form.component';
import { ITodo } from '~modules/todo/todo-item/todo-item.component';

const todosArr: ITodo[] = [
	{
		id: 1,
		title: 'Todo tite',
		description: 'Todo desc',
		isCompleted: true,
		isPrivate: false,
		createdAt: new Date(),
	},
	{
		id: 2,
		title: 'Todo tite',
		description: 'Todo desc',
		isCompleted: true,
		isPrivate: false,
		createdAt: new Date(),
	},
];

const App = (): React.ReactNode => {
	return (
		<>
			<TodoContainer todos={todosArr} />
			<TodoForm />
		</>
	);
};

export default App;
