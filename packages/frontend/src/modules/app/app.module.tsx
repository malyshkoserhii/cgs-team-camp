import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '~shared/components/button/button.component';
import { useCounterStore } from '~store/counter.store';
import { useTodoStore } from '~store/todo.store';

const App = (): React.ReactNode => {
	const navigate = useNavigate();
	const count1 = useCounterStore((state) => state.counter);
	const todos = useTodoStore((state) => state.todos);
	const getAllTodo = useTodoStore((state) => state.getAllTodo);

	const deleteTodo = useTodoStore((state) => state.deleteTodo);

	React.useEffect(() => {
		getAllTodo();
	}, []);

	return (
		<>
			<h1>Here will be my todos</h1>
			<p>{count1}</p>
			{todos.map((todo) => (
				<div key={todo.id}>
					<h4>{todo.title}</h4>
					<p>{todo.description}</p>
					<button onClick={() => deleteTodo(`${todo.id}`)}>
						delete
					</button>
					<div>
						<button
							onClick={() =>
								navigate(`dashboard/edit/${todo.id}`)
							}
						>
							Edit todo
						</button>
					</div>
				</div>
			))}
			<Button
				text="Increase12"
				// onClick={() => {
				// 	addTodo({
				// 		title: 'Super Todo from front',
				// 		description:
				// 			'some description for super tudu lololololo',
				// 		completed: true,
				// 		public: true,
				// 	});
				// }}
				onClick={() => deleteTodo('2')}
			/>
		</>
	);
};

export default App;
