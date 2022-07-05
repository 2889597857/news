import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
  paramsSerializer: params => qs.stringify(params, { indices: false })
};
