import { css } from '@emotion/css';
import { spacingMap } from '~shared/styles/fontSizes';

export const filterStyles = css`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: ${spacingMap[400]};
`;
