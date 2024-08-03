import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { config } from 'react-spring';
import Carousel from 'react-spring-3d-carousel';

import { ITodo } from '../../../types/todo/todo.types';
import { TodoListCard } from '../todo-card';
import { StyledTableErrorMessage } from '../todo-table/table-container';
import { FormModal } from '../todo-form/form-modal';
import { TodoSwiperContainerStyled } from './swiper-container.styled';

interface TodoListContainerProps {
	data: ITodo[] | undefined;
	// fetchMoreFunc: () => {};
}

const getTouches = (evt: React.TouchEvent<Element>): React.TouchList =>
	evt.touches;

export const TodoSwiperContainer: React.FunctionComponent<
	TodoListContainerProps
> = ({ data }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [initialState, setInitialState] = useState<ITodo>();

	const [state, setState] = useState({
		goToSlide: 0,
		offsetRadius: 3,
		showNavigation: false,
		enableSwipe: true,
		config: config.slow,
		xDown: null as number | null,
		yDown: null as number | null,
	});

	const slides =
		data?.map((todo, index) => ({
			key: index,
			content: (
				<TodoListCard
					width="400px"
					editClick={() => {
						setInitialState(todo);
						onOpen();
					}}
					todo={todo}
				/>
			),
			onClick: () => setState({ ...state, goToSlide: index }),
		})) || [];

	const handleTouchStart = (evt: React.TouchEvent<Element>): void => {
		if (!state.enableSwipe) {
			return;
		}

		const firstTouch = getTouches(evt as React.TouchEvent)[0];
		setState({
			...state,
			xDown: firstTouch.clientX,
			yDown: firstTouch.clientY,
		});
	};

	const handleTouchMove = (evt: React.TouchEvent): void => {
		if (!state.enableSwipe || (!state.xDown && !state.yDown)) {
			return;
		}

		const xUp = evt.touches[0].clientX;
		const yUp = evt.touches[0].clientY;

		const xDiff = state.xDown! - xUp;
		const yDiff = state.yDown! - yUp;
		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) {
				/* left swipe */
				setState({
					...state,
					goToSlide: state.goToSlide + 1,
					xDown: null,
					yDown: null,
				});
			} else {
				/* right swipe */
				setState({
					...state,
					goToSlide: state.goToSlide - 1,
					xDown: null,
					yDown: null,
				});
			}
		}
	};

	// useEffect(() => {
	// 	if (
	// 		state.goToSlide >= (data?.length ?? 0) - state.offsetRadius &&
	// 		state.goToSlide === (data?.length ?? 1) - 1
	// 	) {
	// 		fetchMoreFunc();
	// 	}
	// }, [state.goToSlide]);

	return (
		<TodoSwiperContainerStyled>
			{data === undefined ? (
				<StyledTableErrorMessage>
					Something bad happend...
				</StyledTableErrorMessage>
			) : data.length === 0 ? (
				<StyledTableErrorMessage>No data</StyledTableErrorMessage>
			) : (
				<div
					style={{ minWidth: '100%', height: '600px' }}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
				>
					<Carousel
						slides={slides}
						goToSlide={state.goToSlide}
						offsetRadius={state.offsetRadius}
						showNavigation={state.showNavigation}
						animationConfig={state.config}
					/>
				</div>
			)}
			<FormModal
				isOpen={isOpen}
				formType="UPDATE"
				onClose={onClose}
				initialState={initialState}
			/>
		</TodoSwiperContainerStyled>
	);
};
