import { AxiosRequestConfig, Canceler, AxiosResponse, Method, AxiosError } from 'axios';

export type cancelTokenType = {
  cancelKey: string;
  cancelExecutor: Canceler;
};

export type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>;

export interface HttpRequestConfig extends AxiosRequestConfig {
  requestCb?: (request: HttpRequestConfig) => void; // 请求发送之前
  responseCb?: (response: HttpResponse) => void; // 相应返回之前
}
export interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig;
  data: { code: number; data: any[] };
}

export interface HttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export default class Http {
  cancelTokenList: Array<cancelTokenType>;

  clearCancelTokenList(): void;

  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig
  ): Promise<T>;

  post<T>(url: string, params?: T, config?: HttpRequestConfig): Promise<T>;

  get<T>(url: string, params?: T, config?: HttpRequestConfig): Promise<T>;
}
