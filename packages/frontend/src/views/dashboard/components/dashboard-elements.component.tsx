import styled from '@emotion/styled';

import { THEME } from '~shared/styles/theme';

export const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${THEME.spacings.md};
`;

export const TopBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Tab = styled.button`
	padding: ${THEME.spacings.xs} ${THEME.spacings.sm};
	background-color: ${THEME.colors.light};
	border: none;
	cursor: pointer;
`;

export const SearchInput = styled.input`
	padding: ${THEME.spacings.xs} ${THEME.spacings.sm};
	border: 1px solid ${THEME.colors.light};
	border-radius: 4px;
`;
