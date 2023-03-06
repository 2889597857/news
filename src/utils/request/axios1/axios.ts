/* eslint-disable no-underscore-dangle */
import Axios, { AxiosInstance, AxiosRequestConfig, CancelTokenStatic } from 'axios';
import { defaultConfig } from './axios.config';
import { cancelTokenType, HttpError, HttpRequestConfig, HttpResponse, RequestMethods } from './axios.d';

export class HttpRequest {
  constructor() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  // axios 实例
  private axiosInstance: AxiosInstance = Axios.create();

  // 取消请求
  private CancelToken: CancelTokenStatic = Axios.CancelToken;

  // 请求列表
  private sourceTokenList: Array<cancelTokenType> = [];

  // 记录当前这一次cancelToken的key
  private currentCancelTokenKey = '';

  // 生成 cancelKey
  // eslint-disable-next-line class-methods-use-this
  private genUniqueKey(config: HttpRequestConfig): string {
    return `${config.url}--${JSON.stringify(config.data)}`;
  }

  // 自定义拦截器，不使用统一拦截器
  // 请求
  private requestCb: HttpRequestConfig['requestCb'] = undefined;

  // 响应
  private responseCb: HttpRequestConfig['responseCb'] = undefined;

  // 取消重复请求
  private cancelRepeatRequest(): void {
    //  temp 记录已经发送的请求
    const temp: { [key: string]: boolean } = {};
    this.sourceTokenList = this.sourceTokenList.reduce<Array<cancelTokenType>>(
      (res: Array<cancelTokenType>, cancelToken: cancelTokenType) => {
        const { cancelKey, cancelExecutor } = cancelToken;
        if (!temp[cancelKey]) {
          // 第一次请求
          temp[cancelKey] = true;
          res.push(cancelToken);
        } else {
          // 后续请求被取消
          cancelExecutor();
        }
        return res;
      },
      []
    );
  }

  private deleteCancelTokenByCancelKey(cancelKey: string): void {
    this.sourceTokenList = this.sourceTokenList.length < 1 ? this.filterTokenList(cancelKey) : [];
  }

  // 过滤掉已经发送的请求
  private filterTokenList(cancelKey: string): Array<cancelTokenType> {
    return this.sourceTokenList.filter(cancelToken => cancelToken.cancelKey !== cancelKey);
  }

  // 清空请求列表
  public clearCancelTokenList(): void {
    this.sourceTokenList.length = 0;
  }

  //  全局拦截器
  // 请求拦截器
  private interceptorsRequest(): void {
    this.axiosInstance.interceptors.request.use(
      (config: HttpRequestConfig) => {
        // NProgress.start();
        window.$loadingBar?.start();
        const _config = config;
        // 生成 cancelKey
        const cancelKey = this.genUniqueKey(_config);

        _config.cancelToken = new this.CancelToken(cancelExecutor => {
          this.sourceTokenList.push({ cancelKey, cancelExecutor });
        });
        // 取消重复请求
        this.cancelRepeatRequest();
        // 记录当前的 cancelKey
        this.currentCancelTokenKey = cancelKey;
        // 自定义拦截器
        if (typeof this.requestCb === 'function') {
          this.requestCb(_config);
          this.requestCb = undefined;
          return _config;
        }
        _config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return _config;
      },
      error => Promise.reject(error)
    );
  }

  // 响应拦截器
  private interceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response: HttpResponse) => {
        window.$loadingBar?.finish();
        // 生成 cancelKey
        const cancelKey = this.genUniqueKey(response.config);
        // 从请求列表中删除这次请求
        this.deleteCancelTokenByCancelKey(cancelKey);
        // 自定义拦截器
        if (this.responseCb != undefined) {
          this.responseCb(response);
          this.responseCb = undefined;
          return response.data;
        }
        if (response.status === 200) {
          const { code, data } = response.data;
          if (code === 200) {
            return data;
          }
        }
      },
      (error: HttpError) => {
        const _error = error;
        if (this.currentCancelTokenKey) {
          // 查看请求列表中是否有这次请求
          const hasKey = this.sourceTokenList.filter(
            cancelToken => cancelToken.cancelKey === this.currentCancelTokenKey
          ).length;
          if (hasKey) {
            // 从请求列表中 删除此次请求
            this.sourceTokenList = this.filterTokenList(this.currentCancelTokenKey);
            this.currentCancelTokenKey = '';
          }
        }
        // 取消请求
        _error.isCancelRequest = Axios.isCancel(_error);
        // NProgress.done();
        Promise.reject(_error);
      }
    );
  }

  /**
   *
   * @param url 请求地址
   * @param method 请求方式
   * @param date 请求参数
   * @param interceptors 自定义拦截器
   * @returns 请求结果
   */
  public request<T>(url: string, method: RequestMethods, data?: AxiosRequestConfig): Promise<T> {
    const config = Object.assign(defaultConfig, { url, method, data });
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public get<T>(url: string, data?: AxiosRequestConfig): Promise<T> {
    return this.request(url, 'get', data);
  }

  public post<T>(url: string, data?: AxiosRequestConfig): Promise<T> {
    return this.request(url, 'post', data);
  }
}
