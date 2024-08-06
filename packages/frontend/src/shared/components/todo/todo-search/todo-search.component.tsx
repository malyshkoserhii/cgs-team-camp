import React from 'react';
import {
	InputGroup,
	Input,
	InputGroupProps,
	InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { isMobile } from 'react-device-detect';

import { StyledInput } from './todo-search.styled';

interface TodoSearchProps extends InputGroupProps {}

export const TodoSearch: React.FunctionComponent<TodoSearchProps> = ({
	onChange,
	...props
}) => {
	return isMobile ? (
		<InputGroup {...props}>
			<Input paddingLeft="1em" placeholder="Search" />
			<InputRightElement pointerEvents="none">
				<SearchIcon />
			</InputRightElement>
		</InputGroup>
	) : (
		<InputGroup {...props}>
			<StyledInput>
				<Input
					onChange={onChange}
					paddingLeft="1em"
					height="100%"
					placeholder="Search"
					border={isMobile ? '1px' : 'none'}
				/>
			</StyledInput>
			<InputRightElement pointerEvents="none">
				<SearchIcon />
			</InputRightElement>
		</InputGroup>
	);
};
