import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { notificationService } from '~shared/services/notificationService';

interface RequestOptions<T> {
	request: () => Promise<AxiosResponse<T>>;
}

interface UseRequestReturn<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export const useRequest = <T>({
	request,
}: RequestOptions<T>): UseRequestReturn<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await request();
			setData(response.data);
		} catch (error) {
			notificationService.error(error.response.data.error);
			setError(error.response.data.error);
		} finally {
			setLoading(false);
		}
	}, [request]);

	useEffect(() => {
		fetchData();
	}, []);

	return { data, loading, error, refetch: fetchData };
};
