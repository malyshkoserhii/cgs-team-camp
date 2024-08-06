import { errorMessageList, HttpStatus } from '@/constants/http-errors.constant';
import { HttpErrorType } from '@/types/http-errors.type';

export const HttpError = (
	status: HttpStatus,
	message: string = errorMessageList[status],
): HttpErrorType & Error => {
	const error = new Error(message) as HttpErrorType & Error;
	error.status = status;
	error.message = message;

	return error;
};
