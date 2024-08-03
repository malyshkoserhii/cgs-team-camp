import React, { useState } from 'react';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';

import { ITodo } from '../../../types/todo/todo.types';
import { TodoListContainerStyled } from './list-container.styled';
import { TodoListCard } from '../todo-card';
import { StyledTableErrorMessage } from '../todo-table/table-container';
import { FormModal } from '../todo-form/form-modal';

interface TodoListContainerProps {
	data: ITodo[] | undefined;
}

export const TodoListContainer: React.FunctionComponent<
	TodoListContainerProps
> = ({ data }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [initialState, setInitialState] = useState<ITodo>();

	return (
		<TodoListContainerStyled>
			{data === undefined ? (
				<StyledTableErrorMessage>
					Something bad happend...
				</StyledTableErrorMessage>
			) : (
				<SimpleGrid spacing={4} padding="1em" gap={10} width="100%">
					{data?.map((todo) => (
						<TodoListCard
							borderColor="white"
							variant="filled"
							maxW="sm"
							key={todo.id}
							todo={todo}
							editClick={() => {
								setInitialState(todo);
								onOpen();
							}}
						/>
					))}
					<FormModal
						isOpen={isOpen}
						formType="UPDATE"
						onClose={onClose}
						initialState={initialState}
					/>
				</SimpleGrid>
			)}
			<FormModal
				isOpen={isOpen}
				formType="UPDATE"
				onClose={onClose}
				initialState={initialState}
			/>
		</TodoListContainerStyled>
	);
};
