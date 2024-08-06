import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';

import React from 'react';
import TodoItem from '~modules/Todos/TodoItem/TodoItem';
import { Todo } from '~shared/types/todo.types';

export type TabletDashboardProps = {
	todos: Todo[];
	removeTodo: (id: number) => void;
	nextPage?: () => void;
	isLastPage?: boolean;

	loading?: boolean;
};
export const TabletDashboard: React.FC<TabletDashboardProps> = ({
	todos,
	removeTodo,
}) => {
	return (
		<Swiper
			grabCursor
			centeredSlides
			slidesPerView={2}
			effect="coverflow"
			loop={true}
			pagination={{ clickable: true }}
			coverflowEffect={{
				rotate: 0,
				stretch: 0,
				depth: 100,
				modifier: 3,
				slideShadows: true,
			}}
			modules={[Pagination, EffectCoverflow]}
		>
			{todos?.map((todo) => (
				<SwiperSlide key={todo.id}>
					<TodoItem todo={todo} removeTodo={removeTodo} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};
