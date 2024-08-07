import { css } from '@emotion/css';
import { SIZES } from '~shared/styles/theme';

export const container = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${SIZES.m};
`;
