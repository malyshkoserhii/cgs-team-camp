import React from 'react';
import { isMobile } from 'react-device-detect';

import { IUser } from '../../../types/user/user.types';
import { COLORS } from '../../../../theme';
import styled from '@emotion/styled';

interface UserHeaderStyledProps {
	user: IUser | undefined;
	children: React.ReactNode;
}

export const UserHeaderStyled = styled('div')<UserHeaderStyledProps>`
	width: 100%;
	padding: 0.5em 1em;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${({ user }): string => (user ? 'space-around' : 'end')};
	margin-bottom: 0.5em;
	${!isMobile && `border-bottom: 1px solid ${COLORS.gray};`};
`;
