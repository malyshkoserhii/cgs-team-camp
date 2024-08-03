import React from 'react';
import { isMobile } from 'react-device-detect';

import { TodoFilter } from '../../todo-filters';
import { TodoSearch } from '../../todo-search';
import { TodoHeaderStyled } from './todo-header.styled';
import { debounce } from 'lodash';

export interface TodoTableHeaderProps {
	variant: string;
}

export const TodoTableHeader: React.FunctionComponent<TodoTableHeaderProps> = ({
	variant,
}) => {
	return (
		<TodoHeaderStyled>
			<TodoFilter
				onChange={() => {}}
				width="100%"
				justifyContent={isMobile ? 'space-around' : 'flex-start'}
				size="md"
				variant={isMobile ? 'line' : 'enclosed'}
			/>

			<TodoSearch
				onChange={debounce(() => {}, 500)}
				width={isMobile ? '100%' : 'fit-content'}
				size="md"
				variant={variant}
			/>
		</TodoHeaderStyled>
	);
};
