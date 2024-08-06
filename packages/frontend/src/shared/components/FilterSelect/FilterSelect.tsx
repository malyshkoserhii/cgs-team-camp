import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select, ItemPredicate, ItemRenderer } from '@blueprintjs/select';

import { FILTER_KEYS } from '~shared/keys';
import { container } from '~shared/components/FilterSelect/FilterSelect.styles';

interface FilterOption {
	key: FILTER_KEYS;
	label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
	{ key: FILTER_KEYS.ALL, label: 'All' },
	{ key: FILTER_KEYS.COMPLETED, label: 'Completed' },
	{ key: FILTER_KEYS.PRIVATE, label: 'Private' },
	{ key: FILTER_KEYS.PUBLIC, label: 'Public' },
];

const filterItemPredicate: ItemPredicate<FilterOption> = (query, item) => {
	return item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

const renderFilterItem: ItemRenderer<FilterOption> = (
	item,
	{ handleClick, modifiers },
) => {
	if (!modifiers.matchesPredicate) {
		return null;
	}

	return (
		<MenuItem
			active={modifiers.active}
			disabled={modifiers.disabled}
			key={item.key}
			onClick={handleClick}
			text={item.label}
		/>
	);
};

interface FilterSelectProps {
	selectedFilter: FILTER_KEYS;
	onFilterChange: (filter: FILTER_KEYS) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
	selectedFilter,
	onFilterChange,
}) => {
	const selectedFilterLabel =
		FILTER_OPTIONS.find((option) => option.key === selectedFilter)?.label ||
		'Select Filter';

	return (
		<div className={container}>
			<Select
				items={FILTER_OPTIONS}
				itemPredicate={filterItemPredicate}
				itemRenderer={renderFilterItem}
				noResults={<MenuItem disabled={true} text="No results." />}
				onItemSelect={(item) => onFilterChange(item.key)}
			>
				<Button
					text={selectedFilterLabel ?? '(No selection)'}
					alignText="left"
					fill={true}
					rightIcon="caret-down"
				/>
			</Select>
		</div>
	);
};
