import { ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '~shared/styles/breakpoints';
import { Flex } from '../../base/flex';
import { usePagination } from '../model/usePagination';
import { paginationContainerStyles } from './pagination.styles';
import { PaginationButton } from './paginationButton.component';

interface PaginationProps {
	initialPage?: number;
	itemsPerPage?: number;
	siblingCount?: number;
	totalPages?: number;
}

export const defaultLimit = 10;

export const Pagination = ({
	initialPage = 1,
	siblingCount = 1,
	itemsPerPage = defaultLimit,
	totalPages,
}: PaginationProps): ReactElement | null => {
	const isMobileAndTablet = useMediaQuery({
		query: `(max-width: ${breakpoints.lg})`,
	});
	const {
		goToPage,
		nextPage,
		prevPage,
		pageNumbers,
		canNextPage,
		canPrevPage,
	} = usePagination({
		totalPages,
		itemsPerPage,
		initialPage,
		siblingCount,
	});

	if (isMobileAndTablet) {
		return null;
	}

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
						active={pageNumber === initialPage}
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
