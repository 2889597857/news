import { AxiosRequestConfig, Method } from 'axios';
import CustomAxiosInstance from './instance';

type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>;

export function createRequest(config: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(config);

  function request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig): Promise<T> {
    const axiosConfig = {
      method,
      url,
      ...param
    };
    return new Promise((resolve, reject) => {
      customInstance.instance.request(axiosConfig);
    });
  }
  function get() {}
}
