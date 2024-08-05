import { Intent } from '@blueprintjs/core';
import { responseCodes } from '~/api/responseCodes';
import { responseMessages } from '~/api/responseMessages';
import { showToast } from '~/utils/showToast';
import type { AxiosError } from 'axios';

class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

const errorMap: { [key: number]: string } = {
	[responseCodes.BAD_REQUEST]: responseMessages.BAD_REQUEST,
	[responseCodes.UNAUTHORIZED]: responseMessages.UNAUTHORIZED,
	[responseCodes.FORBIDDEN]: responseMessages.FORBIDDEN,
	[responseCodes.NOT_FOUND]: responseMessages.NOT_FOUND,
	[responseCodes.INTERNAL_SERVER_ERROR]:
		responseMessages.INTERNAL_SERVER_ERROR,
};

export const errorHandler = (axiosError: AxiosError): ApiError => {
	let apiError: ApiError;

	const status = axiosError.response?.status;
	if (status && status in errorMap) {
		apiError = new ApiError(errorMap[status], status);
	} else if (axiosError.response) {
		apiError = new ApiError(
			`Request failed with status ${axiosError.response.status}`,
			axiosError.response.status,
		);
	} else if (axiosError.request) {
		apiError = new ApiError(responseMessages.NO_RESPONSE, 0);
	} else {
		apiError = new ApiError(responseMessages.REQUEST_ERROR, 0);
	}

	showToast(apiError.message, Intent.DANGER);

	return apiError;
};
