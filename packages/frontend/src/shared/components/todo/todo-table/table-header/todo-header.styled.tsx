import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const TodoHeaderStyled = styled.div`
	display: flex;
	justify-content: space-around;
	${isMobile && 'flex-direction: column-reverse;'}
`;
