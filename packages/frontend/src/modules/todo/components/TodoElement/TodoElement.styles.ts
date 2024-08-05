import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const todoElementStyles = css`
	border: 1px solid ${THEME.colors.border};
	margin: ${THEME.spacing.medium};
	padding: ${THEME.spacing.medium};
	border-radius: ${THEME.borders.radius};
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${THEME.colors.background};
	}

	h3 {
		font-size: ${THEME.fontSizes.large};
		margin: 0 0 ${THEME.spacing.small} 0;
	}

	p {
		font-size: ${THEME.fontSizes.medium};
		margin: 0 0 ${THEME.spacing.small} 0;
	}
`;
