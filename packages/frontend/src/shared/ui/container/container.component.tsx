import { css } from '@emotion/css';
import classNames from 'classnames';
import { ReactElement } from 'react';
import { breakpoints } from '~shared/styles/breakpoints';

const containerBaseStyle = css`
	margin: 0 auto;
	padding: 0 16px;
	max-width: 100%;
`;

const containerSizes = {
	xs: css`
		max-width: 100%;
	`,
	sm: css`
		@media (min-width: ${breakpoints.sm}) {
			max-width: 540px;
		}
	`,
	md: css`
		@media (min-width: ${breakpoints.md}) {
			max-width: 720px;
		}
	`,
	lg: css`
		@media (min-width: ${breakpoints.lg}) {
			max-width: 1440px;
		}
	`,
	xl: css`
		@media (min-width: ${breakpoints.xl}) {
			max-width: 1980px;
		}
	`,
};

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const Container = ({
	children,
	className,
	size = 'lg',
}: ContainerProps): ReactElement => {
	const styles = classNames(
		containerBaseStyle,
		containerSizes[size],
		className,
	);

	return <div className={styles}>{children}</div>;
};
