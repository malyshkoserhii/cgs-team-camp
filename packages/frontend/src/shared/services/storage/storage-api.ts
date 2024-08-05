import { STORAGE_KEYS } from '~shared/const/keys.const.js';
import { type StorageApi } from './libs/types/types.js';

type ValueOf<T> = T[keyof T];

export { type ValueOf };

type Constructor = {
	storage: globalThis.Storage;
};

class Storage implements StorageApi {
	#storage: globalThis.Storage;

	public constructor({ storage }: Constructor) {
		this.#storage = storage;
	}

	public clear(): Promise<void> {
		this.#storage.clear();

		return Promise.resolve();
	}

	public drop(key: ValueOf<typeof STORAGE_KEYS>): void {
		this.#storage.removeItem(key as string);
	}

	public get<R = string>(key: ValueOf<typeof STORAGE_KEYS>): R | null {
		return this.#storage.getItem(key as string) as R;
	}

	public has(key: ValueOf<typeof STORAGE_KEYS>): boolean {
		const value = this.get(key);

		return Boolean(value);
	}

	public set(key: ValueOf<typeof STORAGE_KEYS>, value: string): void {
		this.#storage.setItem(key as string, value);
	}
}

export { Storage };
