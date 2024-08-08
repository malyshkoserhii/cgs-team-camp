import { css } from '@emotion/css';
import { THEME, COLORS } from '~shared/styles/constants';

export const listStyles = css`
	display: flex;
	flex-direction: column;
`;

export const paginationControlsStyles = css`
	display: flex;
	justify-content: center;
	margin-top: ${THEME.SPACING.LARGE};
	padding: ${THEME.SPACING.MEDIUM} 0;

	button {
		background-color: ${COLORS.PRIMARY};
		color: ${COLORS.SECONDARY};
		border: none;
		padding: ${THEME.SPACING.SMALL} ${THEME.SPACING.MEDIUM};
		border-radius: 4px;
		cursor: pointer;
		font-size: ${THEME.FONT_SIZES.MEDIUM};
		transition: background-color 0.3s ease;

		&:hover {
			background-color: ${COLORS.SECONDARY};
		}

		&:disabled {
			background-color: ${COLORS.BORDER};
			cursor: not-allowed;
		}
	}

	@media (max-width: ${THEME.BREAKPOINTS.TABLET}) {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: ${COLORS.BACKGROUND};
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

		button {
			width: 100%;
			max-width: 300px;
			padding: ${THEME.SPACING.MEDIUM};
		}
	}
`;
