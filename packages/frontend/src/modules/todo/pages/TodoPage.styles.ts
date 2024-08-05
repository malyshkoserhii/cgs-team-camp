import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const formContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spacing.medium};
	padding: ${THEME.spacing.large};
	background-color: ${THEME.colors.white};
	border: ${THEME.borders.width} solid ${THEME.colors.border};
	border-radius: ${THEME.borders.radius};
	box-shadow: ${THEME.shadows.medium};
	max-width: 600px;
	margin: 0 auto;
`;

export const labelStyles = css`
	font-size: ${THEME.fontSizes.medium};
	margin-bottom: ${THEME.spacing.small};
	color: ${THEME.colors.primary};
`;

export const inputStyles = css`
	padding: ${THEME.spacing.small};
	border: 1px solid ${THEME.colors.border};
	border-radius: ${THEME.borders.radius};
	margin-bottom: ${THEME.spacing.medium};
`;

export const inputContainerStyles = css`
	margin-bottom: ${THEME.spacing.medium};
	display: flex;
	flex-direction: column;
`;

export const checkboxStyles = css`
	margin-bottom: ${THEME.spacing.medium};
	margin-left: ${THEME.spacing.small};
`;

export const buttonContainerStyles = css`
	display: flex;
	justify-content: space-between;
	gap: ${THEME.spacing.small};
	margin-top: ${THEME.spacing.medium};
`;

export const titleStyles = css`
	font-size: ${THEME.fontSizes.large};
	margin-bottom: ${THEME.spacing.medium};
	color: ${THEME.colors.primary};
`;

export const descriptionStyles = css`
	font-size: ${THEME.fontSizes.medium};
	margin-bottom: ${THEME.spacing.small};
	color: ${THEME.colors.text};
`;

export const statusStyles = css`
	font-size: ${THEME.fontSizes.medium};
	margin-bottom: ${THEME.spacing.medium};
	color: ${THEME.colors.secondary};
`;
