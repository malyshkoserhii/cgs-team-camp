import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Todo } from '~typings/todo.types';
import { useDeviceType } from '~shared/hooks';
import { TodoItem } from '~modules/todos/TodoItem/TodoItem';
import {
	todosContainer,
	wrapperMobilePagination,
} from '~modules/todos/TodoList/TodoList.styles';
import { swiperContainerStyle } from '~modules/todos/TodoItem/TodoItem.styles';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { wrapperPagination } from '~modules/todos/todos.styles';
import { Button } from '~shared/components';

interface TodoListProps {
	filteredTodos: Todo[];
	handleNextPage: () => void;
	handlePreviousPage: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
	filteredTodos,
	handleNextPage,
	handlePreviousPage,
}) => {
	const { isMobile, isTablet, isLaptop } = useDeviceType();

	return (
		<div className={todosContainer}>
			{isMobile && (
				<div className={wrapperMobilePagination}>
					{filteredTodos.map((item) => (
						<TodoItem key={item.id} todo={item} />
					))}
				</div>
			)}

			{isTablet && (
				<Swiper
					className={swiperContainerStyle}
					spaceBetween={10}
					slidesPerView={'auto'}
					pagination={{ clickable: true }}
					navigation
					modules={[Navigation, Pagination]}
				>
					{filteredTodos.map((item) => (
						<SwiperSlide key={item.id}>
							<TodoItem todo={item} />
						</SwiperSlide>
					))}
				</Swiper>
			)}

			{isLaptop && (
				<>
					{filteredTodos.map((item) => (
						<TodoItem key={item.id} todo={item} />
					))}

					<div className={wrapperPagination}>
						<Button
							text={'Previous'}
							onClick={handlePreviousPage}
						/>
						<Button text={'Next'} onClick={handleNextPage} />
					</div>
				</>
			)}
		</div>
	);
};
