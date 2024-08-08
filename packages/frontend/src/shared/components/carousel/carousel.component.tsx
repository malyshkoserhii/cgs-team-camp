import React, {
	FC,
	useState,
	useRef,
	useCallback,
	useEffect,
	useMemo,
} from 'react';
import { Button, Icon } from '@blueprintjs/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

import {
	swiperNavigation,
	swiperNextButton,
	swiperPrevButton,
	arrowButton,
} from './carousel.styles';

type CarouselProps = {
	items: React.ReactNode[];
	currentPage: number;
	totalPages: number;
	onPrevPage: () => void;
	onNextPage: () => void;
	initialSlide?: number;
};

const Carousel: FC<CarouselProps> = ({
	items,
	currentPage,
	totalPages,
	onPrevPage,
	onNextPage,
	initialSlide = 0,
}) => {
	const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
	const swiperRef = useRef<SwiperType | null>(null);

	const handleSlideChange = useCallback((swiper: SwiperType) => {
		setCurrentSlide(swiper.activeIndex);
	}, []);

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.slideTo(initialSlide, 0);
		}
	}, [initialSlide]);

	const handlePrevPage = useCallback(() => {
		if (currentSlide === 0 && currentPage > 1) {
			onPrevPage();
			if (swiperRef.current) {
				swiperRef.current.slideTo(items.length - 1, 0);
			}
		} else if (swiperRef.current) {
			swiperRef.current.slidePrev();
		}
	}, [currentSlide, currentPage, onPrevPage, items.length]);

	const handleNextPage = useCallback(() => {
		if (currentSlide === items.length - 1 && currentPage < totalPages) {
			onNextPage();
			if (swiperRef.current) {
				swiperRef.current.slideTo(0, 0);
			}
		} else if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	}, [currentSlide, items.length, currentPage, totalPages, onNextPage]);

	const showPrevButton = useMemo(
		() => currentSlide === 0 && currentPage > 1,
		[currentSlide, currentPage],
	);
	const showNextButton = useMemo(
		() => currentSlide === items.length - 1 && currentPage < totalPages,
		[currentSlide, currentPage, totalPages],
	);

	return (
		<div>
			<Swiper
				spaceBetween={10}
				slidesPerView={1}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				onSlideChange={handleSlideChange}
				allowTouchMove={true}
				initialSlide={initialSlide}
			>
				{items.map((item, index) => (
					<SwiperSlide key={index}>{item}</SwiperSlide>
				))}
			</Swiper>
			<div className={swiperNavigation}>
				{showPrevButton && (
					<Button
						className={`${swiperPrevButton} ${arrowButton}`}
						onClick={handlePrevPage}
						minimal={true}
						large={true}
					>
						<Icon icon="chevron-left" size={24} />
					</Button>
				)}
				{showNextButton && (
					<Button
						className={`${swiperNextButton} ${arrowButton}`}
						onClick={handleNextPage}
						minimal={true}
						large={true}
					>
						<Icon icon="chevron-right" size={24} />
					</Button>
				)}
			</div>
		</div>
	);
};

export default Carousel;
