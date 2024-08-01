import { cx } from '@emotion/css';
import { ReactElement, ReactNode } from 'react';
import { pageWrapperStyle } from './pageWrapper.styles';

type Props = {
	children: ReactNode;
};

export const PageWrapper = ({ children }: Props): ReactElement => {
	return <div className={cx(pageWrapperStyle)}>{children}</div>;
};
