import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import _axios from 'axios';
import { API_BASE_URL, API_KEY } from '../../constants';
import type { IApiSuccessResponse } from './types';

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

  if (err.response) {
    errorMessagge = err.response.statusText;
  }
  throw errorMessagge;
};

export const Api = {
  get: (endpoint: string, config?: AxiosRequestConfig): Promise<Partial<IApiSuccessResponse>> =>
    axios
      .get(endpoint, { ...config })
      .then(handleApiSuccess)
      .catch(handleApiError),
};
