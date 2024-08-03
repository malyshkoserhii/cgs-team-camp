import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';

import { ITodo } from '../../../../types/todo/todo.types';

const columnHelper = createColumnHelper<ITodo>();

export const useTodoColumns = (): ColumnDef<ITodo>[] => [
	columnHelper.accessor('title', {
		cell: (info) => info.getValue(),
		header: 'Title',
	}),
	columnHelper.accessor('description', {
		cell: (info) => info.getValue(),
		header: 'Description',
	}),
	columnHelper.accessor('completed', {
		header: () => 'Completed',
		cell: (props) => (
			<Checkbox
				pointerEvents="none"
				isInvalid={!props.getValue()}
				colorScheme="green"
				isChecked={props.getValue()}
			/>
		),
	}),
	columnHelper.accessor('private', {
		header: () => 'Private',
		cell: (props) => (
			<Checkbox
				pointerEvents="none"
				isInvalid={!props.getValue()}
				colorScheme="blue"
				isChecked={props.getValue()}
			/>
		),
	}),
];
