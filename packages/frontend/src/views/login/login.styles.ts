import { THEME } from '~shared/styles/theme';

import { css } from '@emotion/css';

export const loginWrapper = css`
	height: 100%;
	width: 100%;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${THEME.spacings.xs};
`;
