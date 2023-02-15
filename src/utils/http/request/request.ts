import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import CustomAxiosInstance from './instance';

type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>;
type Request<T> = {
  code: number;
  msg?: string;
  data?: T;
};

export function createRequest(config: AxiosRequestConfig) {
  const customInstance = new CustomAxiosInstance(config);

  function request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig): Promise<T> {
    const axiosConfig = {
      method,
      url,
      param
    };
    return new Promise((resolve, reject) => {
      customInstance.instance.request[method](axiosConfig)
        .then((response: AxiosResponse<Request<T>>) => resolve(response.data.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
  function get<T>(url: string, param?: AxiosRequestConfig) {
    return request<T>('get', url, param);
  }
  return {
    get
  };
}

// const App = createRequest({
//   baseURL: 'http://jsonplaceholder.typicode.com/',
//   timeout: 1000
// });
// type a = {
//   data: number;
//   da: string;
// };
// const aget = await App.get<a>('getToken');
// aget.data.data = 123;
