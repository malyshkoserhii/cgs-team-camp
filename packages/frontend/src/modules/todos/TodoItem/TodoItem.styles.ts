import { css } from '@emotion/css';
import { DEVICE } from '~shared/keys';
import { SIZES } from '~shared/styles/theme';

export const elementStyle = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 10px;
	padding: 10px;
	width: 100%;
	border: 1px solid #ccc;
	border-radius: 5px;

	@media ${DEVICE.tablet} {
		width: 400px;
	}
`;

export const buttonGroupStyle = css`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

export const labelWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${SIZES.xs};
`;

export const descriptionStyle = css`
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const swiperContainerStyle = css`
	.swiper {
		width: 100%;
		height: 100%;
	}
	.swiper-slide {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200px; /* змінити висоту слайдера за необхідністю */
	}
`;
