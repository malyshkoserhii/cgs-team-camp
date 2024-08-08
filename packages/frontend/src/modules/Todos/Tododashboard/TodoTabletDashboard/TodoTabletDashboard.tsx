import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
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
	nextPage,
	isLastPage,
}) => {
	const [isFirstRender, setIsFirstRender] = React.useState(true);
	const swiperRef = React.useRef<SwiperRef>(null);
	const [swiperKey, setSwiperKey] = React.useState(0);

	const handleReachEnd = (): Promise<void> => {
		if (isFirstRender) {
			setIsFirstRender(false);
			return;
		}
		if (!isLastPage && nextPage) {
			nextPage();
			setSwiperKey((prev) => prev + 1);
		}
	};

	React.useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);
		}
	}, []);
	React.useEffect(() => {
		if (
			swiperRef.current &&
			swiperRef.current.swiper &&
			swiperRef.current.swiper.slides.length > 10
		) {
			swiperRef.current.swiper.slideTo(
				swiperRef.current.swiper.slides.length - 10,
				500,
			);
		}
	}, [swiperKey]);
	return (
		<Swiper
			key={swiperKey}
			grabCursor
			centeredSlides
			slidesPerView={2}
			effect="coverflow"
			loop={false}
			pagination={{ clickable: true }}
			coverflowEffect={{
				rotate: 0,
				stretch: 0,
				depth: 100,
				modifier: 3,
				slideShadows: true,
			}}
			modules={[Pagination, EffectCoverflow]}
			onReachEnd={handleReachEnd}
			ref={swiperRef}
		>
			{todos?.map((todo) => (
				<SwiperSlide key={todo.id}>
					<TodoItem todo={todo} removeTodo={removeTodo} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};
