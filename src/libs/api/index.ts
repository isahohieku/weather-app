import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import _axios from 'axios';
import axiosRetry from 'axios-retry';
import { API_BASE_URL, API_KEY } from '../../constants';
import type { IApiErrorResponse, IApiResponse } from './types';

const axios = _axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* Add auth header interceptor */
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const appid = API_KEY;
    if (appid) {
      config.params['appid'] = appid;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// https://github.com/softonic/axios-retry/issues/87
const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

const retryConfig = {
  retries: 2,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,
};

const handleApiSuccess = (res: AxiosResponse) => {
  return res.data;
};

const handleApiError = (err: AxiosError) => {
  let errorMessagge = '';

  // request was manually cancelled in a `useEffect` hook
  if (_axios.isCancel(err)) {
    return; // fail silently
  }

  if (err.response) {
    const apiError: IApiErrorResponse = err.response.data;
    // client received an error response (5xx, 4xx)
    console.error(
      `Backend returned code ${err.code}:${apiError.code}, ` + `body was: ${apiError.message}`,
      'data:',
      apiError.data,
    );
    errorMessagge = apiError.message;
  } else if (err.request) {
    // client never received a response, or request never left
    console.error('An error occurred:', err.message);
  } else {
    // anything else
    console.error('Well, that was unexpected:', err.message);
  }

  throw (
    errorMessagge ||
    "We couldn't complete your request. Please try again or check your internet connection."
  );
};

export const Api = {
  getCancelTokenSource: () => _axios.CancelToken.source(),
  get: (endpoint: string, config?: AxiosRequestConfig): Promise<IApiResponse> =>
    axios
      .get(endpoint, { 'axios-retry': retryConfig, ...config })
      .then(handleApiSuccess)
      .catch(handleApiError),
  post: (endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<IApiResponse> =>
    axios.post(endpoint, data, config).then(handleApiSuccess).catch(handleApiError),
  put: (endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<IApiResponse> =>
    axios.put(endpoint, data, config).then(handleApiSuccess).catch(handleApiError),
  delete: (endpoint: string, config?: AxiosRequestConfig): Promise<IApiResponse> =>
    axios.delete(endpoint, config).then(handleApiSuccess).catch(handleApiError),
};
