import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { notificationService } from '~shared/services/notificationService';

interface RequestOptions<T> {
	request: (data?: T) => Promise<AxiosResponse<T>>;
	message?: string;
	initCall?: boolean;
}

export interface UseRequestReturn<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	fetch: (data?: T) => void;
}

export const useRequest = <T>({
	request,
	initCall = true,
	message,
}: RequestOptions<T>): UseRequestReturn<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(
		async (data?: T) => {
			setLoading(true);
			setError(null);

			try {
				const response = data ? await request(data) : await request();
				setData(response.data);
				if (message) {
					notificationService.success(message);
				}
			} catch (error) {
				const errorMessage =
					error.response?.data?.error || 'An error occurred';
				notificationService.error(errorMessage);
				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		},
		[request],
	);

	useEffect(() => {
		if (initCall) {
			fetchData();
		}
	}, []);

	return { data, loading, error, fetch: fetchData };
};
