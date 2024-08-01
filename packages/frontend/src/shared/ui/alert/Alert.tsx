import 'react-toastify/dist/ReactToastify.css';
import { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';

export const Alert = (): ReactElement => {
	return (
		<ToastContainer autoClose={3000} position="top-center" theme="dark" />
	);
};
