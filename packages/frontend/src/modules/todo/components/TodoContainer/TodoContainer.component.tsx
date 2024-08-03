import * as React from 'react';
import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

const containerStyles = css`
	padding: ${THEME.spacing.medium};
	background-color: ${THEME.colors.background};
	border: 1px solid ${THEME.colors.primary};
	border-radius: 8px;
`;

interface TodoContainerProps {
	children: React.ReactNode;
}

const TodoContainer: React.FunctionComponent<TodoContainerProps> = ({
	children,
}) => {
	return <div className={containerStyles}>{children}</div>;
};

export default TodoContainer;
