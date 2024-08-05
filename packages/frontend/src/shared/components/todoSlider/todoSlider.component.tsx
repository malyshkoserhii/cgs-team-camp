import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ITodo } from '~shared/interfaces/todo.interface';
import { sliderStyles } from './todoSlider.styles';
import TodoItem from '../todoItem/todoItem.component';

interface ITodoSlider {
	todos: ITodo[];
}
const TodoSlider = ({ todos }: ITodoSlider): React.ReactNode => {
	return (
		<Swiper
			className={sliderStyles}
			grabCursor
			centeredSlides
			slidesPerView={1}
			loop={true}
		>
			{todos.map((todo) => (
				<SwiperSlide key={todo.id}>
					<TodoItem todo={todo} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default TodoSlider;
