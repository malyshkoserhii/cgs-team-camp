import * as React from 'react';
import { TodoType } from '../../../typings/todos.type';
import { useTodoStore } from '../../../store';
import { Box, Button, Text, useToast } from '@chakra-ui/react';

interface TodoItemProps {
	todo: TodoType;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const toast = useToast();
	const { deleteTodo, updateTodo } = useTodoStore((state) => ({
		deleteTodo: state.removeTodo,
		updateTodo: state.updateTodo,
	}));

	const handleDelete = (id: number): void => {
		deleteTodo(id);
		toast({
			title: 'Todo item deleted.',
			description: 'The todo item has been deleted successfully.',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	};

	const handleUpdate = (todo): void => {
		updateTodo(todo);
		toast({
			title: 'Todo item updated.',
			description: 'The todo item has been updated successfully.',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Box key={todo.id} p={4} borderWidth={1} borderRadius="lg">
			<Text>{todo.name}</Text>
			<Text>{todo.status}</Text>
			<Text>{todo.descr}</Text>
			<Button
				onClick={() => handleUpdate(todo.id)}
				colorScheme="blue"
				size="sm"
				mt={2}
			>
				Update
			</Button>
			<Button
				onClick={() => handleDelete(todo.id)}
				colorScheme="red"
				size="sm"
				mt={2}
				ml={2}
			>
				Delete
			</Button>
		</Box>
	);
};

export default TodoItem;
