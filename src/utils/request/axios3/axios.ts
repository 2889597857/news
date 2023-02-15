import { getToken } from '@/utils';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const baseConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
};
class CustomAxiosInstance {
  instance: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig) {
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
  }

  setInterceptor() {
    this.instance.interceptors.request.use(
      config => {
        const handleConfig = { ...config };
        handleConfig.headers.Authorization = getToken();
        return handleConfig;
      },
      err => err
    );
    this.instance.interceptors.response.use(
      response => {
        const { status, data } = response;
        if (status === 200) {
          if (data.code == 200) {
            return data.data;
          }
          if (data.code === 201) {
            return Object.assign(data.data, { message: data.message });
          }
        }
      },
      err => false
    );
  }
}

export default function createRequest() {
  const { instance } = new CustomAxiosInstance(baseConfig);
  async function request(url, method, data) {
    return await instance[method](url, data);
  }
  function get(url) {
    return request(url, 'get');
  }
  function post(url, data) {
    return request(url, 'post', data);
  }
  return {
    get,
    post
  };
}
