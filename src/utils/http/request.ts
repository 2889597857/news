import { AxiosRequestConfig, Method } from 'axios';
import CustomAxiosInstance from './instance';

type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>;

export default function createRequest(config: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(config);

  function request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, config?: any): Promise<T> {
    const axiosConfig = {
      method,
      url,
      param,
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
