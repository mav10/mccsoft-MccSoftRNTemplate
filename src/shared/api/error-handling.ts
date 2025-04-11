import {AxiosError} from 'axios';
import {ApiError} from './types';

export class ApiRequestError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export const handleApiError = (error: AxiosError<ApiError>): ApiRequestError => {
  if (error.response?.data) {
    return new ApiRequestError(error.response.data.code, error.response.data.message, error.response.data.details);
  }

  if (error.request) {
    return new ApiRequestError('NETWORK_ERROR', 'Network request failed');
  }

  return new ApiRequestError('UNKNOWN_ERROR', error.message);
};
