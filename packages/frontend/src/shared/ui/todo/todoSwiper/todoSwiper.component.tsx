import { ReactElement } from 'react';
import { Autoplay } from 'swiper/modules';
import { SwiperProps } from 'swiper/react';
import { Carousel } from '~shared/ui/carousel/Carousel';

type Props<T> = {
	items: T[];
	component: React.FunctionComponent<T>;
};

const getCarouselConfig = (): SwiperProps => {
	return {
		autoplay: {
			delay: 5000,
			disableOnInteraction: true,
		},
		modules: [Autoplay],
		slidesPerView: 1,
		loop: true,
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
		freeMode: true,
		allowTouchMove: true,
	};
};

export const TodoSwiper = <T extends { id: number }>({
	items,
	component,
	...otherProps
}: Props<T>): ReactElement => {
	return (
		<Carousel<T>
			{...getCarouselConfig()}
			items={items}
			component={component}
			{...otherProps}
		/>
	);
};
