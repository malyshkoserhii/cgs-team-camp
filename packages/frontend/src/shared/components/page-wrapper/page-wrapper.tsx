import { Spinner } from '@blueprintjs/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '~store/auth.store';
import { useTodoStore } from '~store/todos.store';
import { PageLoader } from './page-wraper.styles.';

interface PageWrapperProps {
	error?: string | null;
	loading: boolean;
	children: React.ReactNode;
}

const PageWrapper = ({
	error,
	loading,
	children,
}: PageWrapperProps): JSX.Element => {
	const resetAuthError = useTodoStore((state) => state.resetError);
	const resetTodosError = useAuthStore((state) => state.resetError);
	const handleResetErrors = (): void => {
		resetAuthError();
		resetTodosError();
	};
	const showContent = !error && !loading;
	if (error) {
		return (
			<>
				<p>Something went wrong: {error}</p>
				<Link to={'/'} onClick={handleResetErrors}>
					Go back to HomePage
				</Link>
			</>
		);
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
