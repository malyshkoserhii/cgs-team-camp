import React from 'react';
import {
	ModalProps,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
} from '@chakra-ui/react';

import { ITodo } from '../../../../types/todo/todo.types';
import { FinalForm } from '../final-form';

interface FormModalProps extends Omit<ModalProps, 'children'> {
	formType: 'ADD' | 'UPDATE';
	initialState?: ITodo;
}

export const FormModal: React.FunctionComponent<FormModalProps> = ({
	isOpen,
	onClose,
	formType,
	initialState,
}) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay />
		<ModalContent>
			<ModalCloseButton />
			<ModalBody>
				<FinalForm
					type={formType}
					onClose={onClose}
					initialState={initialState}
				/>
			</ModalBody>
			<ModalFooter />
		</ModalContent>
	</Modal>
);
