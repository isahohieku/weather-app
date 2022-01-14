import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import _axios from 'axios';
import { API_BASE_URL, API_KEY } from '../../constants';
import type { IApiErrorResponse, IApiSuccessResponse } from './types';

const axios = _axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* Add auth header interceptor */
axios.interceptors.request.use(
  (prevConfig: AxiosRequestConfig) => {
    const config = prevConfig;
    config.params = prevConfig.params || {};
    const appid = API_KEY;
    if (appid) {
      config.params['appid'] = appid;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

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
      `API returned code ${err.code}:${apiError.cod}, ` + `body was: ${apiError.message}`,
      'data:',
    );
    errorMessagge = apiError.message;
  } else {
    // anything else
    console.error('Well, that was unexpected:', err.message);
  }

  return (
    errorMessagge ||
    "We couldn't complete your request. Please try again or check your internet connection."
  );
};

export const Api = {
  get: (endpoint: string, config?: AxiosRequestConfig): Promise<Partial<IApiSuccessResponse>> =>
    axios
      .get(endpoint, { ...config })
      .then(handleApiSuccess)
      .catch(handleApiError),
};
