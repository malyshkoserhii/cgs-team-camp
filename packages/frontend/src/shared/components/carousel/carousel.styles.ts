import { css } from '@emotion/css';

export const swiperNavigation = css`
	position: relative;
	margin-top: 10px;
`;

export const swiperPrevButton = css`
	position: absolute;
	left: 10px;
	z-index: 999;
`;

export const swiperNextButton = css`
	position: absolute;
	right: 10px;
`;

export const arrowButton = css`
	background-color: rgba(255, 255, 255, 0.7);
	border-radius: 50%;
	padding: 10px;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}
`;
