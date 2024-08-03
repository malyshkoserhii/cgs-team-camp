import { css } from '@emotion/css';
// import { colors } from '../../styles';
import { COLORS, THEME } from '~shared/styles/theme';
import { colors } from '~shared/styles';

export const btnStyles = (disabled: boolean): string => {
	return css`
		background-color: ${COLORS.primary};
		border: none;
		padding: ${THEME.spaces.small};
		border-radius: 4px;
		cursor: pointer;
		text-align: center;

		&:hover {
			background-color: ${COLORS.secondary};
			//background-color: darken(${COLORS.primary}, 10%);
		}
		color: ${disabled ? colors.imperial : colors.white};
	`;
};

// width: 100%;
// padding: 17px 0;
// font-size: 20px;
// font-weight: 700;
// background-color: ${disabled
// 			? colors.americanPurple
// 			: colors.mediumVioletRed};
// border: none;
// border-radius: 28px;
// box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);

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
