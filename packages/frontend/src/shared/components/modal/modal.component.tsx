import React, { ReactElement, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
	modal,
	modalOverlay,
	modalCloseButton,
	modalContent,
	modalHeader,
} from './modal.styled';
import useModalStore from '~store/modal.store';
import { Dialog } from '@blueprintjs/core';

export const Modal: React.FC = () => {
	const { show, inner, close } = useModalStore();

	return (
		<Dialog isOpen={show} onClose={close}>
			{inner?.children}
		</Dialog>
	);
};
