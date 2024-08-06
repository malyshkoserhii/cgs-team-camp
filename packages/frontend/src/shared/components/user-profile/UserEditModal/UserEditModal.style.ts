import { css } from '@emotion/css';
import { SIZES } from '~shared/styles';

export const UserProfileContainer = css`
	display: flex;
	gap: ${SIZES.l};
	align-items: center;
	p {
		size: ${SIZES.xl};
		line-height: ${SIZES.lineHeightM};
		font-weight: bold;
	}
`;

export const UserEditModalStyles = css`
	min-height: 100px;

	box-shadow: none;
`;

export const UserEditModalButton = css`
	display: flex;
	margin-inline: auto;
	margin-block: ${SIZES.m};
	align-self: baseline;
`;
