import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
	showModal: boolean;
	content: {
		children: ReactNode;
	} | null;
	openModal: (content: { children: ReactNode }) => void;
	closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
	showModal: false,
	content: null,
	openModal: (content): void => set({ showModal: true, content }),
	closeModal: (): void => set({ showModal: false, content: null }),
}));

export default useModalStore;
