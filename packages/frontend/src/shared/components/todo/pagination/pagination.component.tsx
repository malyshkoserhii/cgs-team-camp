import React from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useFilterStore } from '~/state/store/filter.store';

interface PaginationProps {}

export const Pagination: React.FunctionComponent<PaginationProps> = ({}) => {
	const { data, setPage } = useFilterStore();

	const blocks = Array.from(
		{ length: data.maxPages },
		(_, index) => index + 1,
	);

	return (
		<Stack
			direction="row"
			spacing={4}
			align="center"
			justify="center"
			marginTop={'1em'}
		>
			<ChevronLeftIcon
				cursor={'pointer'}
				width={'20px'}
				height={'20px'}
				onClick={() => {
					setPage(data.page - 1);
				}}
			/>
			{blocks.map((value) => {
				const isCurrent = value === data.page;
				return (
					<Button
						color={isCurrent ? 'purple' : 'gray'}
						onClick={() => {
							setPage(value);
						}}
					>
						{value}
					</Button>
				);
			})}
			<ChevronRightIcon
				cursor={'pointer'}
				width={'20px'}
				height={'20px'}
				onClick={() => {
					setPage(data.page + 1);
				}}
			/>
		</Stack>
	);
};
