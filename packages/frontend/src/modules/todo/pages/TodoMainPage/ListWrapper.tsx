import React, { FC } from 'react';
import { ListWrapper } from './TodoMainPage.styles';

interface ListWrapperProps {
	children: React.ReactNode;
}

const ListWrapperComponent: FC<ListWrapperProps> = ({ children }) => (
	<ListWrapper>{children}</ListWrapper>
);

export default ListWrapperComponent;
