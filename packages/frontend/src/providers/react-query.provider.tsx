import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);
};

export default ReactQueryProvider;
