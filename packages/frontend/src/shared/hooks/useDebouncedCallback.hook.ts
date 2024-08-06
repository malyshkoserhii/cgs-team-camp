import { useRef } from 'react';

type Func<T extends unknown[]> = (...args: T) => void;

export const useDebouncedCallback = <T extends unknown[]>(
	func: Func<T>,
	delay: number,
): Func<T> => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	return (...args: T) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			func(...args);
		}, delay);
	};
};
