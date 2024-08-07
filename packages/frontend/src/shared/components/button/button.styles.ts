import { css } from '@emotion/css';
import { colors } from '~shared/styles';
import { BREAKPOINTS } from '~shared/styles/breakpoints';
import { SIZES } from '~shared/styles/sizes';

export const btnStyles = (disabled: boolean): string => {
	return css`
		width: fit-content;
		min-width: 40px;
		padding: ${SIZES.xs};
		font-size: ${SIZES.xs};
		font-weight: 700;
		color: ${disabled ? colors.darkOrchid : colors.white};
		background-color: ${disabled
			? colors.americanPurple
			: colors.majorelleBlue};
		border: none;
		border-radius: ${SIZES.m};
		box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);
		text-align: center;
		transition: all 0.3s ease;
		cursor: ${disabled ? 'not-allowed' : 'pointer'};
		:hover,
		:focus {
			background-color: ${colors.blueLight};
			transition: all 0.3s ease;
		}

		@media (min-width: ${BREAKPOINTS.tablet}) {
			font-size: ${SIZES.m};
			padding: ${SIZES.s};
		}
		@media (min-width: ${BREAKPOINTS.desktop}) {
			font-size: ${SIZES.m};
		}
	`;
};

export const btnContentWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const iconWrapper = css`
	display: flex;
	align-items: center;
`;

export const mr = css`
	margin-right: 15px;
`;
export const btnLoaderWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 20px;
`;
