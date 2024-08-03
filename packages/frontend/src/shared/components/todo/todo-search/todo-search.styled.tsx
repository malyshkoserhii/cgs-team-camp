import styled from '@emotion/styled';
import { CHAKRA, COLORS } from '../../../../theme';

export const TodoInputStyled = styled.div`
	display: flex;
	justify-content: space-around;
`;

export const StyledInput = styled.div`
	border-top: 1px solid ${COLORS.gray};
	border-left: 1px solid ${COLORS.gray};
	border-right: 1px solid ${COLORS.gray};
	border-radius: ${CHAKRA.MARGIN.md} ${CHAKRA.MARGIN.md} 0 0;
`;
