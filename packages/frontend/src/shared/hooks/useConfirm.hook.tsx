import { ConfirmationForm } from '~/components/modalContent/confirmModal.component';
import useModalStore from '~store/modal.store';

export const useConfirm = ({
	message = 'Please, confirm your action.',
}: {
	message?: string;
} = {}): (() => void) => {
	const { closeModal, openModal } = useModalStore();

	const confirm = (): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			openModal({
				children: (
					<ConfirmationForm
						message={message}
						onConfirm={() => {
							resolve(true);
							closeModal();
						}}
						onCancel={() => {
							reject();
							closeModal();
						}}
					/>
				),
			});
		});
	};

	return confirm;
};
