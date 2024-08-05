import { cx } from '@emotion/css';
import { ReactElement, ReactNode } from 'react';
import { centeredStyle, pageWrapperStyle } from './pageWrapper.styles';

type Props = {
	children: ReactNode;
	center?: boolean;
};

export const PageWrapper = ({ children, center }: Props): ReactElement => {
	return (
		<div className={cx(pageWrapperStyle, { [centeredStyle]: center })}>
			{children}
		</div>
	);
};
