import { ReactElement, useEffect, useState } from 'react';
import { Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { SwiperProps } from 'swiper/react';
import { useShowMore } from '~shared/hooks/useShowMore.hook';
import { Carousel } from '~shared/ui/carousel/Carousel';
import { useTodoStore } from '~store/todos.store';

type Props<T> = {
	items: T[];
	component: React.FunctionComponent<T>;
};

const getCarouselConfig = (onReachEnd?: () => void): SwiperProps => {
	return {
		modules: [Mousewheel, Pagination, Navigation],
		slidesPerView: 1,
		breakpoints: {
			640: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1000: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1260: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
		allowTouchMove: true,
		mousewheel: {
			releaseOnEdges: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		onReachEnd,
	};
};

export const TodoSwiper = <T extends { id: number }>({
	items,
	component,
	...otherProps
}: Props<T>): ReactElement => {
	const showMore = useShowMore();
	const { hasMore } = useTodoStore();
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const onReachEnd = (): void => {
		if (isMounted && hasMore) {
			showMore();
		}
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<Carousel<T>
			{...getCarouselConfig(onReachEnd)}
			items={items}
			component={component}
			onReachEnd={onReachEnd}
			{...otherProps}
		/>
	);
};
