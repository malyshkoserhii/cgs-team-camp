import React, { useState } from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	chakra,
	useDisclosure,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	ColumnDef,
	SortingState,
	getSortedRowModel,
} from '@tanstack/react-table';

import { FormModal } from '../../todo-form/form-modal';
import { ITodo } from '../../../../types/todo/todo.types';

export type DataTableProps<Data extends ITodo> = {
	data: Data[];
	columns: ColumnDef<ITodo>[];
};

export function TodoDataTable<Data extends ITodo>({
	data,
	columns,
}: DataTableProps<Data>): React.JSX.Element {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [initialState, setInitialState] = useState<ITodo>();

	return (
		<div>
			<Table variant="striped">
				<Thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<Tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<Th
										key={header.id}
										onClick={header.column.getToggleSortingHandler()}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}

										<chakra.span pl="4">
											{header.column.getIsSorted() ? (
												header.column.getIsSorted() ===
												'desc' ? (
													<TriangleDownIcon aria-label="sorted descending" />
												) : (
													<TriangleUpIcon aria-label="sorted ascending" />
												)
											) : null}
										</chakra.span>
									</Th>
								);
							})}
						</Tr>
					))}
				</Thead>
				<Tbody>
					{table.getRowModel().rows.map((row) => (
						<Tr
							key={row.id}
							cursor="pointer"
							onClick={() => {
								setInitialState(row.original);
								onOpen();
							}}
						>
							{row.getVisibleCells().map((cell) => {
								return (
									<Td key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</Table>
			<FormModal
				isOpen={isOpen}
				formType="UPDATE"
				onClose={onClose}
				initialState={initialState}
			/>
		</div>
	);
}
