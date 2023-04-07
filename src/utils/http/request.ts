import { AxiosRequestConfig, Method } from 'axios';
import CustomAxiosInstance from './instance';

type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>;

export default function createRequest(AxiosConfig: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(AxiosConfig);
  function request<T>(method: RequestMethods, url: string, data?: AxiosRequestConfig, config?: any): Promise<T> {
    const axiosConfig = {
      method,
      url,
      data,
      ...config
    };

    return customInstance.instance.request(axiosConfig);
  }
  function get<T>(url: string, param?: AxiosRequestConfig) {
    return request<T>('get', url, param);
  }
  function post<T>(url: string, data?: any, config?: any) {
    return request<T>('post', url, data, config);
  }

  return {
    get,
    post
  };
}
