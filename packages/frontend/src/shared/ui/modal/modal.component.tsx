import { Dialog } from '@blueprintjs/core';
import { ReactElement } from 'react';
import useModalStore from '~store/modal.store';
import { modalStyle } from './modal.styles';

export const Modal = (): ReactElement => {
	const { showModal, content, closeModal } = useModalStore((state) => ({
		showModal: state.showModal,
		content: state.content,
		closeModal: state.closeModal,
	}));

	return (
		<Dialog className={modalStyle} isOpen={showModal} onClose={closeModal}>
			{content?.children}
		</Dialog>
	);
};
