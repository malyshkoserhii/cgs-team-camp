import * as React from 'react';

import TodoList from '~shared/components/todoList/todoList.component';
import { useTodoStore } from '~store/todo.store';

const App = (): React.ReactNode => {
	const todos = useTodoStore((state) => state.todos);
	const getAllTodo = useTodoStore((state) => state.getAllTodo);

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
