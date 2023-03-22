import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { handleAxiosError, handleServiceResult } from './handleError';
import handleRefreshToken from './utils';

export const defaultConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:888',
  timeout: 5000
};

export default class CustomAxiosInstance {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    /** axios 实例 */
    this.instance = axios.create(config);
    /** 拦截器 */
    this.setInterceptor();
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          handleConfig.headers.Authorization = `Bearer `;
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        return handleAxiosError(axiosError);
      }
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      async response => {
        const { status, data } = response;
        if (status === 200 || status < 300 || status === 304) {
          // 请求成功
          if (data.code === 200) {
            return data.data;
          }
          if (data.code > 200) {
            return data.data;
          }
          // token失效, 刷新token
          if (data.code === 666) {
            const config = await handleRefreshToken(response.config);
            if (config) {
              return this.instance.request(config);
            }
          }
        }
        return handleServiceResult(data);
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error);
      }
    );
  }
}
function getToken() {
  throw new Error('Function not implemented.');
}
