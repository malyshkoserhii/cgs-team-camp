import {
	Button,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useMediaQuery,
	useToast,
} from '@chakra-ui/react';
import { useTodoStore } from '~store/index';
import TodoItem from './todo.item';
import { useEffect } from 'react';
import { THEME } from '../../styles/theme';

interface TodoItemListProps {
	dashboardId: number;
}

const TodoItemList: React.FC<TodoItemListProps> = ({ dashboardId }) => {
	const toast = useToast();
	const { todos, getTodoItemsByDashboard, deleteTodo, updateTodo } =
		useTodoStore((state) => ({
			todos: state.todos,
			getTodoItemsByDashboard: state.getTodoItemsByDashboard,
			deleteTodo: state.removeTodo,
			updateTodo: state.updateTodo,
		}));
	useEffect(() => {
		getTodoItemsByDashboard(dashboardId);
	}, [getTodoItemsByDashboard]);
	const [isTablet] = useMediaQuery('(max-width: 768px)');
	const [isMobile] = useMediaQuery('(max-width: 480px)');

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
		<div>
			{isMobile ? (
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							<TodoItem todo={todo} />
						</li>
					))}
				</ul>
			) : isTablet ? (
				<div style={{ display: 'flex', overflowX: 'scroll' }}>
					{todos.map((todo) => (
						<div
							key={todo.id}
							style={{
								flex: '0 0 auto',
								margin: THEME.spacing.medium,
							}}
						>
							<TodoItem todo={todo} />
						</div>
					))}
				</div>
			) : (
				<Table>
					<Thead>
						<Tr>
							<Th>Id</Th>
							<Th>Name</Th>
							<Th>Description</Th>
							<Th>Status</Th>
							<Th>Date</Th>
							<Th>Actions button</Th>
						</Tr>
					</Thead>
					<Tbody>
						{todos.map((todo) => (
							<Tr key={todo.id}>
								<Td>{todo.id}</Td>
								<Td>{todo.name}</Td>
								<Td>{todo.descr}</Td>
								<Td>{todo.status}</Td>
								<Td>{todo.date.toString()}</Td>
								<Td>
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
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			)}
		</div>
	);
};

export default TodoItemList;
