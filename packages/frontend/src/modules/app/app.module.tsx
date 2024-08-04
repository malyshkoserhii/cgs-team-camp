import * as React from 'react';
import { ITodo } from '~/types/todo.type';
import { TodoContainer } from '~modules/todo/todo-container/todo-container.component';
import AddAndUpdateForm from '~modules/todo/todo-form/add-update.component-form';
import { Container } from '~shared/components/container/container.components';

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
		title: 'Todo titesss',
		description: 'Todo desc',
		isCompleted: true,
		isPrivate: false,
		createdAt: new Date(),
	},
];

const App = (): React.ReactNode => {
	return (
		<>
		<Container>
			<TodoContainer todos={todosArr} />
		</Container>
			
			{/* <AddAndUpdateForm/> */}
		</>
	);
};

export default App;
