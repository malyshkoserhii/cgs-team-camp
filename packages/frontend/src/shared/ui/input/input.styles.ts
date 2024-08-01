import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const inputWrapperStyle = css`
	display: flex;
	align-items: center;
	border-radius: 10px;
	padding: 8px 16px;
	border: 2px solid ${colors.accentColor};
	width: 100%;

	&.s {
		height: 32px;
	}
	&.m {
		height: 38px;
	}
	&.l {
		height: 44px;
	}

	&.withAddonLeft {
		padding-left: 8px;
	}
	&.withAddonRight {
		padding-right: 8px;
	}

	&.focused {
		border: 2px solid var(--accent-redesigned);

		.addonLeft svg,
		.addonRight svg {
			color: var(--accent-redesigned);
		}
	}

	&.readonly {
		opacity: 0.7;
	}
`;

export const addonStyle = css`
	display: flex;
`;

export const inputStyle = css`
	border: none;
	outline: none;
	width: 100%;
	color: ${colors.mainColor};
	background: none;

	&::placeholder {
		color: ${colors.mainColor};
	}
`;
