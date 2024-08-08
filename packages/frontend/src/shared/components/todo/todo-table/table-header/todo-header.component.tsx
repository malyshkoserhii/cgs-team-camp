import React from 'react';
import { isMobile } from 'react-device-detect';

import { TodoFilter } from '../../todo-filters';
import { TodoSearch } from '../../todo-search';
import { TodoHeaderStyled } from './todo-header.styled';
import { debounce } from 'lodash';
import { useFilterStore } from '~/state/store/filter.store';
import { COLORS } from '~/theme';

export interface TodoTableHeaderProps {
	variant: string;
}

export const TodoTableHeader: React.FunctionComponent<TodoTableHeaderProps> = ({
	variant,
}) => {
	const { data: filter, setFilter } = useFilterStore();

	return (
		<TodoHeaderStyled>
			<TodoFilter
				onChange={() => {}}
				width="100%"
				justifyContent={isMobile ? 'space-around' : 'flex-start'}
				borderBottom={isMobile ? `1px solid ${COLORS.gray}` : '0px'}
				direction={'row'}
			/>

			<TodoSearch
				onChange={debounce((event) => {
					const { value } = event.target as HTMLInputElement;

					setFilter({
						...filter,
						search: value,
						page: 1,
					});
				}, 500)}
				width={isMobile ? '100%' : 'fit-content'}
				size="md"
				variant={variant}
			/>
		</TodoHeaderStyled>
	);
};
