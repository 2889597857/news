import { AxiosRequestConfig } from 'axios'
export const defaultConfig: AxiosRequestConfig = {
	baseURL: 'http://jsonplaceholder.typicode.com',
	timeout: 10000,
}
export const METHODS = ['post', 'get', 'put', 'delete', 'option', 'patch']
