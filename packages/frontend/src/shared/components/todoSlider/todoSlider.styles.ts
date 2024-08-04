import { css } from '@emotion/css';

export const sliderStyles = css`
	width: 400px;
	height: 100%;
	display: flex;
	overflow: hidden;

	.swiper-wrapper {
		display: flex;
	}
`;

export const swiperSlide = css`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	padding-inline: 0;
	border: 1px solid black;
	background: lightblue;
`;
