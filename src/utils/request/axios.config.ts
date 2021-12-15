import { AxiosRequestConfig } from 'axios'
export const defaultConfig: AxiosRequestConfig = {
	baseURL: import.meta.env.BASE_URL,
	timeout: 10000,
}
export const METHODS = ['post', 'get', 'put', 'delete', 'option', 'patch']
