import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

type Props = {
	children: ReactNode;
};

export const Providers = ({ children }: Props): ReactElement => {
	return (
		<BrowserRouter>
			<ErrorBoundary>{children}</ErrorBoundary>
		</BrowserRouter>
	);
};
