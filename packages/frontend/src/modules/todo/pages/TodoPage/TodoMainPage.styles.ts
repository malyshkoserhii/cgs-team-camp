import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { THEME } from '~shared/styles/theme';

export const TodoListWrapper = styled.div`
	padding: ${THEME.spacing.large};
	background-color: ${THEME.colors.background};
	color: ${THEME.colors.text};
`;

export const TableWrapper = styled.table`
	width: 100%;
	border-collapse: collapse;

	th,
	td {
		padding: ${THEME.spacing.small};
		text-align: left;
		border-bottom: 1px solid ${THEME.colors.secondary};
	}
`;

export const SliderWrapper = styled.div`
	display: flex;
	overflow-x: auto;
	flex-wrap: nowrap;
	white-space: nowrap;

	& > div {
		flex: 0 0 auto;
		margin-right: ${THEME.spacing.small};
	}
`;

export const ListWrapper = styled.ul`
	list-style-type: none;
	padding: 0;

	li {
		padding: ${THEME.spacing.small};
		border-bottom: 4px solid ${THEME.colors.secondary};
	}
`;

export const formContainerStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: ${THEME.colors.background};
`;

export const formStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spacing.large};
	background-color: ${THEME.colors.white};
	padding: ${THEME.spacing.large};
	border-radius: ${THEME.borders.radius};
	box-shadow: ${THEME.shadows.medium};
`;

export const labelStyles = css`
	font-size: ${THEME.fontSizes.small};
	margin-bottom: ${THEME.spacing.small};
`;

export const inputStyles = css`
	padding: ${THEME.spacing.small};
	font-size: ${THEME.fontSizes.medium};
	border: 1px solid ${THEME.colors.border};
	border-radius: ${THEME.borders.radius};
`;

export const checkboxStyles = css`
	transform: scale(1.5);
	margin-top: ${THEME.spacing.medium};
`;

export const buttonContainerStyles = css`
	display: flex;
	justify-content: space-between;
	margin-top: ${THEME.spacing.large};
`;
