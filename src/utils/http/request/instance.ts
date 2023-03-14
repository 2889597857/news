import { getToken } from '@/utils/auth';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

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
      async (config: AxiosRequestConfig) => {
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          // 数据转换
          // const contentType = handleConfig.headers['Content-Type'] as string;
          // handleConfig.data = await transformRequestData(handleConfig.data, contentType);
          // 设置token
          handleConfig.headers.Authorization = `Bearer ${getToken()}`;
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        return Promise.reject(axiosError);
        // const error = handleAxiosError(axiosError);
        // return handleServiceResult(error, null);
      }
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      async response => {
        const { status } = response;
        if (status === 200 || status < 300 || status === 304) {
          const { data } = response;
          // 请求成功
          if (data.code === 200) {
            return handleServiceResult(null, data[dataKey]);
          }

          // token失效, 刷新token
          if (REFRESH_TOKEN_CODE.includes(data[codeKey])) {
            // const config = await handleRefreshToken(response.config);
            // if (config) {
            //   return this.instance.request(config);
            // }
          }

          const error = handleBackendError(data, this.backendConfig);
          return handleServiceResult(error, null);
        }
        const error = handleResponseError(response);
        return handleServiceResult(error, null);
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
