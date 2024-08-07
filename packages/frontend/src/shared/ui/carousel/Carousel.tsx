import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { cx } from '@emotion/css';
import { ComponentType, ReactElement } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Flex } from '../base/flex';
import Button from '../button/button.component';
import { buttonStyle } from '../button/button.styles';
import { paginationButtonsStyles } from './Carousel.styles';

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
			<Swiper
				{...otherProps}
				navigation={{
					nextEl: '.swiper-button-next1',
					prevEl: '.swiper-button-prev1',
				}}
			>
				{items.map((item) => (
					<SwiperSlide key={item.id}>
						<Component {...item} />
					</SwiperSlide>
				))}
				<Flex
					justify="center"
					gap="20px"
					className={paginationButtonsStyles}
				>
					<Button
						icon="arrow-left"
						className={cx(buttonStyle, 'swiper-button-prev1')}
					/>
					<Button
						icon="arrow-right"
						className={cx(buttonStyle, 'swiper-button-next1')}
					/>
				</Flex>
			</Swiper>
		</div>
	);
};
