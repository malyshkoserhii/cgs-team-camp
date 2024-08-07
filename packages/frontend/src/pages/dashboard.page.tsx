import { useParams } from 'react-router-dom';
import * as React from 'react';
import TodoForm from '../shared/components/todos/todo.form';
import TodoList from '../shared/components/todos/todo.container';

const DashboardPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	return (
		<div>
			<h1>Dashboard {id}</h1>
			<TodoForm dashboardId={Number(id)} />
			<TodoList dashboardId={Number(id)} />
		</div>
	);
};

export default DashboardPage;
