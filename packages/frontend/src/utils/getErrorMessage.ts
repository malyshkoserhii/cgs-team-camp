import type { ReactNode } from 'react';

export const getErrorMessage = (error: unknown): ReactNode => {
	if (typeof error === 'string') {
		return error;
	}
	return null;
};
