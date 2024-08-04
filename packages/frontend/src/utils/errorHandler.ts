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

export const errorHandler = (axiosError: AxiosError): ApiError => {
	let apiError: ApiError;

	switch (axiosError.response?.status) {
		case responseCodes.BAD_REQUEST:
			apiError = new ApiError(
				responseMessages.BAD_REQUEST,
				responseCodes.BAD_REQUEST,
			);
			break;
		case responseCodes.UNAUTHORIZED:
			apiError = new ApiError(
				responseMessages.UNAUTHORIZED,
				responseCodes.UNAUTHORIZED,
			);
			break;
		case responseCodes.FORBIDDEN:
			apiError = new ApiError(
				responseMessages.FORBIDDEN,
				responseCodes.FORBIDDEN,
			);
			break;
		case responseCodes.NOT_FOUND:
			apiError = new ApiError(
				responseMessages.NOT_FOUND,
				responseCodes.NOT_FOUND,
			);
			break;
		case responseCodes.INTERNAL_SERVER_ERROR:
			apiError = new ApiError(
				responseMessages.INTERNAL_SERVER_ERROR,
				responseCodes.INTERNAL_SERVER_ERROR,
			);
			break;
		default:
			if (axiosError.response) {
				apiError = new ApiError(
					`Request failed with status ${axiosError?.response.status}`,
					axiosError.response.status,
				);
			} else if (axiosError.request) {
				apiError = new ApiError(responseMessages.NO_RESPONSE, 0);
			} else {
				apiError = new ApiError(responseMessages.REQUEST_ERROR, 0);
			}
			break;
	}

	showToast(apiError.message, Intent.DANGER);

	return apiError;
};
