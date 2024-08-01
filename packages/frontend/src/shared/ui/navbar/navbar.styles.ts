import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const navbarStyle = css`
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 5px 10px;
	height: 70px;
	justify-content: space-between;
	background-color: ${colors.secondaryBgColor};
`;
