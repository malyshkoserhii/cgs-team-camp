import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TodoList } from '../../components/TodoList/TodoList';
import { useTodoStore } from '~store/todo.store';
import { useUserStore } from '~store/user.store';
import { ButtonGroup, Button, Spinner, InputGroup } from '@blueprintjs/core';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';
import {
	buttonGroup,
	searchFormStyles,
	spinnerStyles,
} from './TodosPage.styles';
import { useInitialData } from '~shared/hooks/useInitialData';
// import { todoFilters } from '~shared/types/todoFilters.type';

export const TodosPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {
		todos,
		pagination,
		isLoading: todoLoading,
		error: todoError,
	} = useTodoStore();
	const { user, error: userError, isLoading: userLoading } = useUserStore();
	useInitialData();

	const isDesktop = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	// const isTablet = useMediaQuery(
	// 	`(min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	// );

	const searchParams = new URLSearchParams(location.search);
	const [searchInput, setSearchInput] = useState(
		searchParams.get('search') || '',
	);
	const currentFilters = {
		public: searchParams.get('public'),
		status: searchParams.get('status'),
		search: searchParams.get('search'),
	};

	const updateFilters = (
		filterType: 'public' | 'status' | 'search' | 'page' | 'pageSize',
		value: string | null,
	): void => {
		const updatedFilters = { ...currentFilters, [filterType]: value };
		const updatedParams = new URLSearchParams();
		Object.entries(updatedFilters).forEach(([key, val]) => {
			if (val !== null && val !== undefined && val !== '') {
				updatedParams.set(key, val);
			}
		});
		const queryString = updatedParams.toString();
		navigate(queryString ? `?${queryString}` : '');
	};

	const handleSearch = (e: React.FormEvent): void => {
		e.preventDefault();
		updateFilters('search', searchInput);
		updateFilters('page', '1');
	};

	const handlePageChange = (newPage: number): void => {
		updateFilters('page', newPage.toString());
	};

	if (!user || !todos) {
		return (
			<div className={spinnerStyles}>
				<Spinner size={50} />
			</div>
		);
	}

	if (todoError || userError) {
		return <div>Error: {todoError || userError}</div>;
	}

	return (
		<div>
			<form onSubmit={handleSearch} className={searchFormStyles}>
				<InputGroup
					type="text"
					placeholder="Search todos..."
					value={searchInput}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSearchInput(e.target.value)
					}
					rightElement={
						<Button type="submit" icon="search" minimal={true} />
					}
				/>
			</form>
			<ButtonGroup className={buttonGroup}>
				<Button
					icon="person"
					onClick={() => updateFilters('public', 'false')}
					active={currentFilters.public === 'false'}
				>
					Private
				</Button>
				<Button
					icon="people"
					onClick={() => updateFilters('public', 'true')}
					active={currentFilters.public === 'true'}
				>
					Public
				</Button>
				<Button
					icon="tick"
					onClick={() => updateFilters('status', 'completed')}
					active={currentFilters.status === 'completed'}
				>
					Completed
				</Button>
				<Button
					icon="cross"
					onClick={() => updateFilters('status', 'active')}
					active={currentFilters.status === 'active'}
				>
					Active
				</Button>
			</ButtonGroup>
			<div>
				{todoLoading || userLoading ? (
					<Spinner size={20} />
				) : (
					<>
						<TodoList />
						{isDesktop && (
							<ButtonGroup>
								{[...Array(pagination.totalPages)].map(
									(_, index) => (
										<Button
											key={index}
											onClick={() =>
												handlePageChange(index + 1)
											}
											active={
												pagination.page === index + 1
											}
										>
											{index + 1}
										</Button>
									),
								)}
							</ButtonGroup>
						)}
					</>
				)}
			</div>
		</div>
	);
};
