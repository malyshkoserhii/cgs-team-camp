import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';

import { ITodo } from '../../../types/todo/todo.types';
import { TodoListContainerStyled } from './list-container.styled';
import { TodoListCard } from '../todo-card';
import { StyledTableErrorMessage } from '../todo-table/table-container';
import { FormModal } from '../todo-form/form-modal';
import { useFilterStore } from '~/state/store/filter.store';

interface TodoListContainerProps {
	data: ITodo[] | undefined;
}

export const TodoListContainer: React.FunctionComponent<
	TodoListContainerProps
> = ({ data }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [initialState, setInitialState] = useState<ITodo>();
	const { data: filter, setPage } = useFilterStore();

	const handleScrollToBottom = useCallback(() => {
		setPage(filter.page + 1);
	}, []);

	return (
		<TodoListContainerStyled>
			{!data || data.length <= 0 ? (
				<StyledTableErrorMessage>No data</StyledTableErrorMessage>
			) : (
				<SimpleGrid spacing={4} padding="1em" gap={10} width="100%">
					{data?.map((todo) => (
						<TodoListCard
							borderColor="white"
							variant="filled"
							maxW="sm"
							key={todo.id}
							todo={todo}
							editClick={() => {
								setInitialState(todo);
								onOpen();
							}}
						/>
					))}
					<FormModal
						isOpen={isOpen}
						formType="UPDATE"
						onClose={onClose}
						initialState={initialState}
					/>
					<ScrollToBottom onScrollToBottom={handleScrollToBottom} />
				</SimpleGrid>
			)}
			<FormModal
				isOpen={isOpen}
				formType="UPDATE"
				onClose={onClose}
				initialState={initialState}
			/>
		</TodoListContainerStyled>
	);
};

interface ScrollToBottomProps {
	onScrollToBottom: () => void;
}

const ScrollToBottom: React.FunctionComponent<ScrollToBottomProps> = ({
	onScrollToBottom,
}) => {
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;

		if (!sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					onScrollToBottom();
				}
			},
			{ threshold: 1.0 },
		);

		observer.observe(sentinel);

		return () => {
			if (sentinel) observer.unobserve(sentinel);
		};
	}, [onScrollToBottom]);

	return <div ref={sentinelRef} style={{ height: '1px' }} />;
};

export default ScrollToBottom;
