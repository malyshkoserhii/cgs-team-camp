import React, { FC, useCallback } from 'react';
import { Tabs, Tab } from '@blueprintjs/core';

import { TopBar, SearchInput } from './dashboard-elements.component';
import { TodoStatus } from '~typings/todo';

type FiltersSectionProps = {
	filters: Record<string, string>;
	setFilters: (filters: Record<string, string>) => void;
};

const FiltersSection: FC<FiltersSectionProps> = ({ filters, setFilters }) => {
	const handleTabChange = useCallback(
		(tabId: string) => {
			if (tabId === 'private') {
				setFilters({
					...filters,
					isPrivate: 'true',
					status: undefined,
					filter: tabId,
				});
			} else if (tabId === 'public') {
				setFilters({
					...filters,
					isPrivate: 'false',
					status: undefined,
					filter: tabId,
				});
			} else if (
				tabId === TodoStatus.Completed ||
				tabId === TodoStatus.InProgress
			) {
				setFilters({
					...filters,
					status: tabId,
					isPrivate: undefined,
					filter: tabId,
				});
			} else {
				setFilters({
					...filters,
					isPrivate: undefined,
					status: undefined,
					filter: 'all',
				});
			}
		},
		[filters, setFilters],
	);

	const handleSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setFilters({ ...filters, search: event.target.value });
		},
		[filters, setFilters],
	);

	return (
		<TopBar>
			<Tabs
				id="TodoTabs"
				animate={true}
				large={true}
				onChange={handleTabChange}
			>
				<Tab id="all" title="All" panel={<div>All todos</div>} />
				<Tab
					id="private"
					title="Private"
					panel={<div>Private todos</div>}
				/>
				<Tab
					id="public"
					title="Public"
					panel={<div>Public todos</div>}
				/>
				<Tab
					id={TodoStatus.Completed}
					title="Completed"
					panel={<div>Completed todos</div>}
				/>
				<Tab
					id={TodoStatus.InProgress}
					title="In Progress"
					panel={<div>In progress todos</div>}
				/>
			</Tabs>
			<SearchInput
				type="text"
				placeholder="Search"
				value={filters.search || ''}
				onChange={handleSearchChange}
			/>
		</TopBar>
	);
};

export default FiltersSection;
