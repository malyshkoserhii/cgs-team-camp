import { css } from '@emotion/css';

import { SIZES } from '~shared/styles/theme';
import { DEVICE } from '~shared/keys';

export const elementStyle = css`
	display: grid;
	grid-template-rows: auto auto auto;
	grid-gap: ${SIZES.s};
	padding: ${SIZES.xs};
	width: 100%;
	border: 1px solid #ccc;
	border-radius: ${SIZES.xxs};
	align-items: center;

	@media ${DEVICE.tablet} {
		width: 400px;
	}

	@media ${DEVICE.laptop} {
		grid-template-rows: none;
		grid-template-columns: 1fr 2fr auto auto auto;
		grid-template-areas:
			'title description delete view completed'
			'title description delete view completed'
			'title description delete view completed';
		align-items: center;
		grid-gap: 0;
	}
`;

export const buttonGroupStyle = css`
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-gap: ${SIZES.s};
	width: 100%;
	justify-content: space-between;

	@media ${DEVICE.laptop} {
		justify-content: flex-start;
		grid-template-columns: auto auto auto;
		grid-template-areas: 'view delete completed';
	}
`;

export const labelWrapper = css`
	display: grid;
	grid-template-columns: auto auto;
	justify-items: center;
	align-items: center;
	grid-gap: ${SIZES.xs};

	@media ${DEVICE.laptop} {
		grid-area: completed;
	}
`;

export const descriptionStyle = css`
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;

	@media ${DEVICE.laptop} {
		grid-area: description;
	}
`;

export const swiperContainerStyle = css`
	.swiper {
		width: 100%;
		height: 100%;
	}
	.swiper-slide {
		display: grid;
		justify-items: center;
		align-items: center;
		height: 400px;
	}
`;
