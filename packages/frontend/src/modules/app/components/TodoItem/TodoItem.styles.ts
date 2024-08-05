import { css } from '@emotion/css';
import { THEME, COLORS } from '~shared/styles/constants';

export const todoElementStyles = css`
	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		display: table-row;
		&:nth-of-type(even) {
			background-color: ${COLORS.BACKGROUND};
		}
	}
	@media (min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME
			.BREAKPOINTS.DESKTOP}) {
		flex: 0 0 300px;
		margin-right: ${THEME.SPACING.MEDIUM};
		scroll-snap-align: start;
		background-color: white;
		border: 1px solid ${COLORS.BORDER};
		border-radius: 4px;
		padding: ${THEME.SPACING.MEDIUM};
	}
	@media (max-width: ${THEME.BREAKPOINTS.TABLET}) {
		margin-bottom: ${THEME.SPACING.MEDIUM};
		border-bottom: 1px solid ${COLORS.BORDER};
		padding-bottom: ${THEME.SPACING.MEDIUM};
	}
`;

export const titleStyles = css`
	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		display: table-cell;
		padding: ${THEME.SPACING.MEDIUM};
	}
	@media (max-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		display: block;
		font-weight: bold;
		margin-bottom: ${THEME.SPACING.SMALL};
	}
`;

export const descriptionStyles = css`
	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		display: table-cell;
		padding: ${THEME.SPACING.MEDIUM};
	}
	@media (max-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		display: block;
		margin-bottom: ${THEME.SPACING.MEDIUM};
	}
`;

export const actionsStyles = css`
	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		display: table-cell;
		padding: ${THEME.SPACING.MEDIUM};
	}
	@media (max-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		display: flex;
		justify-content: space-between;
	}
`;

export const tableRowStyles = css`
	display: table-row;

	&:nth-of-type(even) {
		background-color: ${COLORS.BACKGROUND};
	}

	span {
		display: table-cell;
		padding-left: ${THEME.SPACING.MEDIUM};
		padding-right: ${THEME.SPACING.MEDIUM};

		div {
			display: flex;
			padding: ${THEME.SPACING.MEDIUM};
			justify-content: space-between;
			align-items: center;

			div {
				gap: ${THEME.SPACING.SMALL};
			}
		}
	}
`;

export const cardStyles = css`
	flex: 0 0 250px;
	scroll-snap-align: start;
	background-color: white;
	border: 1px solid ${COLORS.BORDER};
	border-radius: 4px;
	padding: ${THEME.SPACING.MEDIUM};
	margin-right: ${THEME.SPACING.MEDIUM};
`;

export const listItemStyles = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${THEME.SPACING.MEDIUM};
	border-bottom: 1px solid ${COLORS.BORDER};

	&:last-child {
		border-bottom: none;
	}
`;

export const buttonStyles = css`
	background-color: ${COLORS.PRIMARY};
	color: white;
	border: none;
	padding: ${THEME.SPACING.SMALL} ${THEME.SPACING.MEDIUM};
	margin-right: ${THEME.SPACING.SMALL};
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: ${COLORS.SECONDARY};
	}
`;
