import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ComponentType, ReactElement } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Flex } from '../base/flex';

interface ItemWithId {
	id: string | number;
}

type Props<T extends ItemWithId> = SwiperProps & {
	items: T[];
	component: ComponentType<T>;
};

export const Carousel = <T extends ItemWithId>({
	items,
	component: Component,
	...otherProps
}: Props<T>): ReactElement => {
	return (
		<div>
			<Swiper {...otherProps}>
				<Flex>
					{items.map((item) => (
						<SwiperSlide key={item.id}>
							<Component {...item} />
						</SwiperSlide>
					))}
				</Flex>
			</Swiper>
		</div>
	);
};
