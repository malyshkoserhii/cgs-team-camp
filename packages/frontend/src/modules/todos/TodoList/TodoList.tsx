import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Todo } from '~typings/todo.types';
import { useDeviceType } from '~shared/hooks';
import { TodoItem } from '~modules/todos/TodoItem/TodoItem';
import { todosContainer } from '~modules/todos/TodoList/TodoList.styles';
import { swiperContainerStyle } from '~modules/todos/TodoItem/TodoItem.styles';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const TodoList: React.FC<{ filteredTodos: Todo[] }> = ({
	filteredTodos,
}) => {
	const { isMobile, isTablet, isLaptop } = useDeviceType();

	console.log('filteredTodos: ', filteredTodos);

	return (
		<div className={todosContainer}>
			{isMobile &&
				filteredTodos.map((item) => (
					<TodoItem key={item.id} todo={item} />
				))}

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

			{isLaptop &&
				filteredTodos.map((item) => (
					<TodoItem key={item.id} todo={item} />
				))}
		</div>
	);
};
