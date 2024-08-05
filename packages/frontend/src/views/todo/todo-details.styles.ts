import { css } from '@emotion/css';

import { THEME } from '~shared/styles/theme';

export const todoDetailsWrapper = css`
	padding: ${THEME.spacings.md};
	border: 1px solid ${THEME.colors.secondary};
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	gap: ${THEME.spacings.sm};

	p {
		word-wrap: break-word;
		word-break: break-word;
		overflow-wrap: break-word;
	}
`;

export const sectionHeading = css`
	font-size: ${THEME.fontSizes.medium};
	font-weight: ${THEME.fontWeights.bold};
`;
