import React, { useEffect } from 'react';
import { TodoItem } from '../todo-item/todo-item.component';
import { Layout } from '~shared/components/layout/layout.component';
import { ITodo } from '~/types/todo.type';
import { useTodoStore } from '~store/todo.store';

export const TodoContainer: React.FC = () => {
	const {items,fetchTodos} = useTodoStore();
	useEffect(()=>{
		fetchTodos()
	},[])
	console.log(items)
	return (
		<div>
			<h1>Tasks</h1>
			<Layout<ITodo> items={items || null} render={TodoItem} />
		</div>
	);
};
