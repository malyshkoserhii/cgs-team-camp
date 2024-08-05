import * as React from 'react';

import TodoList from '~shared/components/todoList/todoList.component';
import { useTodoStore } from '~store/todo.store';

const App = (): React.ReactNode => {
	const { todos, getAllTodo } = useTodoStore();

	React.useEffect(() => {
		getAllTodo();
	}, []);

	return (
		<>
			<h1>My todos</h1>
			<TodoList todos={todos} />
		</>
	);
};

export default App;
