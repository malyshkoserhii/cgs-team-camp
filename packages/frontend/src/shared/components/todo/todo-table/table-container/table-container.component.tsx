import React from 'react';

import { TodoDataTable } from '../table/table.component';
import { useTodoColumns } from './useTodoColumns';
import {
	StyledTableErrorMessage,
	TodoTableContainerStyled,
} from './table-container.styled';
import { ITodo } from '../../../../types/todo/todo.types';

interface TodoTableContainerProps {
	data: ITodo[] | undefined;
}

export const TodoTableContainer: React.FunctionComponent<
	TodoTableContainerProps
> = ({ data }) => (
	<TodoTableContainerStyled>
		{data.length === 0 || !data ? (
			<StyledTableErrorMessage>No data</StyledTableErrorMessage>
		) : (
			<TodoDataTable columns={useTodoColumns()} data={data} />
		)}
	</TodoTableContainerStyled>
);
