import styled from '@emotion/styled';

export const Container = styled.div`
	padding: ${({ theme }) => theme.spacings.lg};
	background-color: ${({ theme }) => theme.colors.background};
	display: grid;
	gap: ${({ theme }) => theme.spacings.md};
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 2fr;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const Heading = styled.div`
	font-family: ${({ theme }) => theme.fonts.heading};
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.textPrimary};
	padding: ${({ theme }) => theme.spacings.sm};
`;

export const Cell = styled.div`
	font-family: ${({ theme }) => theme.fonts.primary};
	font-size: ${({ theme }) => theme.fontSizes.medium};
	color: ${({ theme }) => theme.colors.textSecondary};
	padding: ${({ theme }) => theme.spacings.sm};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const ActionsContainer = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacings.sm};
	padding: ${({ theme }) => theme.spacings.sm};
`;
