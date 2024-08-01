import { css } from '@emotion/css';
import { colors } from '~shared/styles';
import { breakpoints } from '~shared/styles/breakpoints';
import { spacingMap } from '~shared/styles/fontSizes';

export const listBoxStyle = css`
	@media (min-width: ${breakpoints.lg}) {
		margin-left: auto;
		margin-right: auto;
		background-color: ${colors.secondaryBgColor};
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	@media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
		background: transparent;
	}

	@media (max-width: ${breakpoints.sm}) {
		background: transparent;
	}
`;

export const headingStyle = css`
	margin-bottom: ${spacingMap[300]};
`;
