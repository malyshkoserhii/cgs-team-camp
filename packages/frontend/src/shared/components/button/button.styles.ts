import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const btnStyles = (disabled: boolean): string => {
	return css`
		width: 100%;
		padding: ${THEME.spacing.medium} 0;
		font-size: ${THEME.fontSizes.medium};
		font-weight: 700;
		color: ${disabled ? THEME.colors.secondary : THEME.colors.text};
		background-color: ${disabled
			? THEME.colors.border
			: THEME.colors.primary};
		border: none;
		border-radius: ${THEME.borders.radius};
		box-shadow: ${THEME.shadows.small};
		text-align: center;
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
