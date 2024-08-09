import { Spinner } from '@blueprintjs/core';
import React from 'react';
import { PageLoader } from './page-wraper.styles.';

interface PageWrapperProps {
	error: string | null;
	loading: boolean;
	children: React.ReactNode;
}

const PageWrapper = ({
	error,
	loading,
	children,
}: PageWrapperProps): JSX.Element => {
	const showContent = !error && !loading;
	if (error) {
		return <p>Something went wrong: {error}</p>;
	}

	if (loading) {
		return (
			<div className={PageLoader}>
				<Spinner intent="primary" />
			</div>
		);
	}
	if (showContent) {
		return <>{children}</>;
	}
};

export default PageWrapper;
