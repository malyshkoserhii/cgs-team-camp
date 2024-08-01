import { create } from 'zustand';

interface ICounterStore {
	counter: number;
	updateCounter: (offset: number) => () => void;
	resetCounter: () => void;
}

export const useCounterStore = create<ICounterStore>((set) => {
	return {
		counter: 2,
		updateCounter: (offset: number) => {
			return (): void => {
				set((state) => {
					return {
						counter: state.counter + offset,
					};
				});
			};
		},
		resetCounter: (): void => {
			set({
				counter: 0,
			});
		},
	};
});
