import { css } from '@emotion/css';

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
		}
		color: ${disabled ? colors.imperial : colors.white};
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
