import * as React from 'react';
import { ErrorInfo, ReactNode, Suspense } from 'react';
import { ErrorPage } from '~/pages';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(): {
		hasError: boolean;
	} {
		return {
			hasError: true,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.log(error, errorInfo);
	}

	render(): ReactNode {
		const { hasError } = this.state;
		const { children } = this.props;

		if (hasError) {
			return (
				<Suspense fallback="">
					<ErrorPage />
				</Suspense>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
