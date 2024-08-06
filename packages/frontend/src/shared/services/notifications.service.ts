import { ToastContent, toast } from 'react-toastify';

export const successNotification = (title: string): ToastContent => {
	return toast.success(title, {
		position: 'top-right',
		autoClose: 3233,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: 'colored',
	});
};
export const errorNotification = (title: string): ToastContent => {
	return toast.error(title, {
		position: 'top-right',
		autoClose: 3233,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: 'colored',
	});
};
export const warnNotification = (title: string): ToastContent => {
	return toast.warn(title, {
		position: 'top-right',
		autoClose: 3233,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: 'colored',
	});
};
export const infoNotification = (title: string): ToastContent => {
	return toast.warn(title, {
		position: 'top-right',
		autoClose: 3233,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: 'colored',
	});
};
