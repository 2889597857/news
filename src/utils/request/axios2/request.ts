import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import CustomAxiosInstance from "./instance";
import type { StatusConfig } from "./instance";

type ResponseSuccess = [null, any];
type ResponseFail = [any, null];

/**
 * 封装各个请求方法及结果处理的类
 * @author Soybean(曹理斌) 2021-03-15
 * @class Request
 */
class Request {
  instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  static successHandler(response: AxiosResponse) {
    const result: ResponseSuccess = [null, response];
    return result;
  }

  static failHandler(error: any) {
    const result: ResponseFail = [error, null];
    return result;
  }

  async get(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.instance.get(url, config);
      return Request.successHandler(response);
    } catch (error) {
      return Request.failHandler(error);
    }
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.instance.post(url, data, config);
      return Request.successHandler(response);
    } catch (error) {
      return Request.failHandler(error);
    }
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.instance.put(url, data, config);
      return Request.successHandler(response);
    } catch (error) {
      return Request.failHandler(error);
    }
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.instance.delete(url, config);
      return Request.successHandler(response);
    } catch (error) {
      return Request.failHandler(error);
    }
  }
}

export function createRequest(
  axiosConfig: AxiosRequestConfig,
  statusConfig?: StatusConfig
) {
  const customInstance = new CustomAxiosInstance(axiosConfig, statusConfig);
  const request = new Request(customInstance.instance);
  return request;
}