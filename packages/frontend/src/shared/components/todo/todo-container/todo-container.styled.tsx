import { isMobile } from 'react-device-detect';

import styled from '@emotion/styled';
import { COLORS, FONTS } from '~/theme';

export const TodoContainerStyled = styled.div`
	width: ${isMobile ? '100%' : '70%'};
	margin: auto;
	border: 1px solid ${COLORS.gray};
	display: flex;
	flex-direction: column;
	padding: 0.5em 0;
`;

export const StyledTitle = styled.div`
	font-size: ${FONTS.SIZES.l};
	text-weight: ${FONTS.WEIGHTS.bold};
	border-bottom: 1px solid ${COLORS.gray};
	display: flex;
	justify-content: space-between;
	padding: 0.5em;
`;

export const StyledTodoTableContainer = styled.div`
	padding: 0.5em;
`;

export const StyledTodoMobileContainer = styled.div`
	disply: flex;
	flex-direction: col;
	align-items: center;
`;
