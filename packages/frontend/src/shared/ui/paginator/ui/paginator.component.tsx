import { ReactElement } from 'react';
import { Flex } from '../../base/flex';
import { usePagination } from '../model/usePagination';
import { paginationContainerStyles } from './pagination.styles';
import { PaginationButton } from './paginationButton.component';

interface PaginationProps {
	totalResults?: number;
	initialPage?: number;
	itemsPerPage?: number;
	siblingCount?: number;
}

export const Pagination = ({
	totalResults = 2500,
	initialPage = 1,
	siblingCount = 1,
	itemsPerPage = 10,
}: PaginationProps): ReactElement | null => {
	const {
		currentPage,
		goToPage,
		nextPage,
		prevPage,
		pageNumbers,
		canNextPage,
		canPrevPage,
	} = usePagination({
		totalItems: totalResults,
		itemsPerPage,
		initialPage,
		siblingCount,
	});

	if (!totalResults) return null;

	return (
		<Flex
			direction="row"
			justify="space-between"
			align="center"
			className={paginationContainerStyles}
		>
			<Flex align="center" gap="2px">
				<PaginationButton
					onClick={() => prevPage()}
					disabled={!canPrevPage}
					icon="arrow-left"
				/>
				{pageNumbers.map((pageNumber, index) => (
					<PaginationButton
						key={index}
						active={currentPage === pageNumber}
						onClick={() => goToPage(Number(pageNumber))}
						text={pageNumber}
					/>
				))}
				<PaginationButton
					onClick={() => nextPage()}
					disabled={!canNextPage}
					icon="arrow-right"
				/>
			</Flex>
		</Flex>
	);
};
