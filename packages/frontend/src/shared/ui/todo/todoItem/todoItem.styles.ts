import { css } from '@emotion/css';
import { colors } from '~shared/styles';
import { breakpoints } from '~shared/styles/breakpoints';
import { spacingMap } from '~shared/styles/fontSizes';

export const todoBoxStyles = css`
	@media (min-width: ${breakpoints.xs}) and (max-width: ${breakpoints.lg}) {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		min-height: 300px;
		margin-left: auto;
		margin-right: auto;
		background-color: ${colors.secondaryBgColor};
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	@media (min-width: ${breakpoints.xs}) and (max-width: ${breakpoints.md}) {
		width: 100%;
	}
`;

export const todoCardHeading = css`
	margin-right: auto;
	margin-bottom: ${spacingMap[200]};
`;

export const todoCardContentStyle = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const todoRowContainerStyles = css`
	flex: 1;
`;

export const actionsBoxStyles = css`
	margin-top: auto;
`;

export const headingStatusStyle = css`
	width: 3%;
	align-items: flex-start;
`;

export const headingTitleStyle = css`
	width: 20%;
	align-items: flex-start;
`;

export const headingDescriptionStyle = css`
	width: 66%;
	align-items: flex-start;
`;

export const privacyStyle = css`
	width: 2%;
	align-items: flex-start;
`;

export const headingActionsStyle = css`
	width: 9%;
	align-items: flex-start;
`;
