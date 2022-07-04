import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
  paramsSerializer: params => qs.stringify(params, { indices: false })
};
export const METHODS = ['post', 'get', 'put', 'delete', 'option', 'patch'];
