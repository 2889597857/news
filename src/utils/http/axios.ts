import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenStatic, Method } from 'axios'
import { defaultConfig } from './axios.config'
import { RequestMethods } from './axios.d'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
console.log(loadingBar)
console.log(useLoadingBar)
console.log(useLoadingBar())
class HttpRequest {
	constructor() {
		this.interceptorsRequest()
		this.interceptorsResponse()
	}

	private CancelToken: CancelTokenStatic = axios.CancelToken
	private axiosInstance: AxiosInstance = axios.create()

	// 自定义拦截器，不使用统一拦截器
	private requestCb = undefined
	private responseCb = undefined

	//  全局拦截器
	// 请求拦截器
	private interceptorsRequest() {
		this.axiosInstance.interceptors.request.use(
			config => {
				return config
			},
			error => Promise.reject(error)
		)
	}
	// 响应拦截器
	private interceptorsResponse() {
		this.axiosInstance.interceptors.response.use(
			response => {
				return response.data
			},
			error => {
				Promise.reject(error)
			}
		)
	}

	public request(url: string, method: RequestMethods, date?: object, customInterceptors?: any) {
		const options = Object.assign(defaultConfig, { url, method, date })
		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request(options)
				.then((res: unknown) => resolve(res))
				.catch(error => reject(error))
		})
	}
	public get() {}
	public post() {}
}
export default HttpRequest
