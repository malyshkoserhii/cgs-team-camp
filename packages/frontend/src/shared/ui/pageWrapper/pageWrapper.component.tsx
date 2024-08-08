import { cx } from '@emotion/css';
import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import { centeredStyle, pageWrapperStyle } from './pageWrapper.styles';

type Props = {
	children: ReactNode;
	center?: boolean;
};

export const PageWrapper = ({ children, center }: Props): ReactElement => {
	return (
		<motion.div
			className={cx(pageWrapperStyle, { [centeredStyle]: center })}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
};
