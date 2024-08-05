import { type StorageKey } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type StorageApi = {
	clear(): void;
	drop(key: ValueOf<typeof StorageKey>): void;
	get<R = string>(key: ValueOf<typeof StorageKey>): R | null;
	has(key: ValueOf<typeof StorageKey>): boolean;
	set(key: ValueOf<typeof StorageKey>, value: string): void;
};

export { type StorageApi };
