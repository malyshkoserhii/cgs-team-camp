import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import { useNavigate } from 'react-router';

import { TodoTableHeader } from '../todo-table/table-header';
import { TodoTableContainer } from '../todo-table/table-container';
import {
	StyledTitle,
	StyledTodoMobileContainer,
	StyledTodoTableContainer,
	TodoContainerStyled,
} from './todo-container.styled';
import { ROUTER_KEYS } from '~shared/keys';
import { useTodoStore } from '~/state/store/todo.store';
import { TodoSwiperContainer } from '../todo-swiper-container';
import { TodoListContainer } from '../todo-list-container';
import { useFilterStore } from '~/state/store/filter.store';

export function TodoContainer(): React.FunctionComponentElement<JSX.Element> {
	const navigate = useNavigate();

	const {
		data: { todos },
		getTodos,
	} = useTodoStore();

	const { data: filter, setDefaultFilter } = useFilterStore();

	useEffect(() => {
		getTodos(filter);
	}, [filter]);

	useEffect(() => {
		setDefaultFilter();
	}, []);

	return (
		<TodoContainerStyled>
			<StyledTitle>
				<h1>TODO List</h1>
				<Button
					onClick={() => {
						navigate(ROUTER_KEYS.TODO.CREATE);
					}}
					colorScheme="purple"
					variant="outline"
					leftIcon={<AddIcon boxSize={3} />}
				>
					NEW TODO
				</Button>
			</StyledTitle>

			<BrowserView>
				<StyledTodoTableContainer>
					<TodoTableHeader variant="enclosed" />
					<TodoTableContainer data={todos} />
				</StyledTodoTableContainer>
			</BrowserView>

			<TabletView>
				<TodoTableHeader variant="flushed" />
				<TodoSwiperContainer data={todos} />
			</TabletView>

			<MobileOnlyView>
				<StyledTodoMobileContainer>
					<TodoTableHeader variant="flushed" />
					<TodoListContainer data={todos} />
				</StyledTodoMobileContainer>
			</MobileOnlyView>
		</TodoContainerStyled>
	);
}
