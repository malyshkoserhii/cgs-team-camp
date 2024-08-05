import React, { FC } from 'react';
import { SliderWrapper } from './TodoMainPage.styles';

interface SliderWrapperProps {
	children: React.ReactNode;
}

const SliderWrapperComponent: FC<SliderWrapperProps> = ({ children }) => (
	<SliderWrapper>{children}</SliderWrapper>
);

export default SliderWrapperComponent;
