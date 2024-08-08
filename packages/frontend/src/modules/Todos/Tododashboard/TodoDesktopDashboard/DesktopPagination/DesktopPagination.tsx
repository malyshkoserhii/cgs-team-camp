import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css';
export type DesktopPaginationProps = {
	page: number;
	handlePageClick: () => void;
	pages: number;
};

export const DesktopPagination = ({
	page,
	handlePageClick,
	pages,
}): JSX.Element => {
	console.log(page);
	return (
		<ReactPaginate
			containerClassName="pagination-container"
			previousLabel={
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="pagination-icon"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					width={24}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			}
			pageLinkClassName=""
			activeClassName="pagination-page-active"
			pageClassName="pagination-page"
			forcePage={page === 1 ? 0 : page - 1}
			nextLabel={
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="pagination-icon"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					width={24}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9 5l7 7-7 7"
					/>
				</svg>
			}
			previousClassName="pagination-prev"
			nextClassName="pagination-next"
			marginPagesDisplayed={2}
			pageRangeDisplayed={2}
			pageCount={pages | 0}
			onPageChange={handlePageClick}
		/>
	);
};
