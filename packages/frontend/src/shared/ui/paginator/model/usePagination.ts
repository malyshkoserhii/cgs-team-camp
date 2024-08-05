import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilter } from '~shared/ui/filter/model/useFilter.hook';

interface UsePaginationOptions {
	totalItems: number;
	itemsPerPage: number;
	initialPage?: number;
	siblingCount?: number;
}

interface PaginationState {
	currentPage: number;
	totalPages: number;
	goToPage: (page: number) => void;
	nextPage: () => void;
	prevPage: () => void;
	canNextPage: boolean;
	canPrevPage: boolean;
	pageNumbers: (number | '...')[];
}

const queryName = 'page';

export const usePagination = ({
	totalItems,
	itemsPerPage,
	initialPage = 1,
	siblingCount = 1,
}: UsePaginationOptions): PaginationState => {
	const [searchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState<number>(
		Number(searchParams.get(queryName)) || initialPage,
	);
	const { onUpdateFilter } = useFilter();

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const goToPage = (page: number): void => {
		if (page) {
			const pageNumber = Math.max(1, Math.min(page, totalPages));
			setCurrentPage(pageNumber);
			onUpdateFilter({ page: pageNumber });
		}
	};

	const nextPage = (): void => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	};

	const prevPage = (): void => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	};

	const canNextPage = currentPage < totalPages;
	const canPrevPage = currentPage > 1;

	const pageNumbers = useMemo(() => {
		const delta = siblingCount;
		const buttonsToShow = 6;

		if (totalPages <= buttonsToShow) {
			return Array.from({ length: totalPages }, (_, index) => index + 1);
		}

		const buttons: (number | '...')[] = [];
		const start = Math.max(1, currentPage - delta);
		const end = Math.min(totalPages, currentPage + delta);

		if (currentPage - delta > 1) {
			buttons.push(1);
			if (currentPage - delta > 2) {
				buttons.push('...');
			}
		}

		for (let i = start; i <= end; i++) {
			buttons.push(i);
		}

		if (currentPage + delta < totalPages) {
			if (currentPage + delta < totalPages - 1) {
				buttons.push('...');
			}
			buttons.push(totalPages);
		}

		return buttons;
	}, [currentPage, totalPages, siblingCount]);

	return {
		currentPage,
		totalPages,
		goToPage,
		nextPage,
		prevPage,
		canNextPage,
		canPrevPage,
		pageNumbers,
	};
};
