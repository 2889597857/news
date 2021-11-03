import Axios, { AxiosInstance, AxiosRequestConfig, CancelTokenStatic, Method } from 'axios'
import { defaultConfig } from './axios.config'
import {
	RequestMethods,
	HttpError,
	HttpRequestConfig,
	HttpResponse,
	cancelTokenType,
} from './axios.d'
import NProgress from '../progress'
class HttpRequest {
	constructor() {
		this.interceptorsRequest()
		this.interceptorsResponse()
	}
	// axios 实例
	private axiosInstance: AxiosInstance = Axios.create()

	private CancelToken: CancelTokenStatic = Axios.CancelToken
	private sourceTokenList: Array<cancelTokenType> = []

	// 记录当前这一次cancelToken的key
	private currentCancelTokenKey = ''

	private genUniqueKey(config: HttpRequestConfig): string {
		return `${config.url}--${JSON.stringify(config.data)}`
	}

	// 自定义拦截器，不使用统一拦截器
	private requestCb: HttpRequestConfig['requestCb'] = undefined
	private responseCb: HttpRequestConfig['responseCb'] = undefined

	// 取消重复请求
	private cancelRepeatRequest(): void {
		const temp: { [key: string]: boolean } = {}
		this.sourceTokenList = this.sourceTokenList.reduce<Array<cancelTokenType>>(
			(res: Array<cancelTokenType>, cancelToken: cancelTokenType) => {
				const { cancelKey, cancelExecutor } = cancelToken
				if (!temp[cancelKey]) {
					temp[cancelKey] = true
					res.push(cancelToken)
				} else {
					cancelExecutor()
				}
				return res
			},
			[]
		)
	}
	private deleteCancelTokenByCancelKey(cancelKey: string): void {
		this.sourceTokenList =
			this.sourceTokenList.length < 1
				? this.sourceTokenList.filter(cancelToken => cancelToken.cancelKey !== cancelKey)
				: []
	}

	//  全局拦截器
	// 请求拦截器
	private interceptorsRequest(): void {
		this.axiosInstance.interceptors.request.use(
			(config: HttpRequestConfig) => {
				NProgress.start()

				const _config = config

				const cancelKey = this.genUniqueKey(_config)

				_config.cancelToken = new this.CancelToken(cancelExecutor => {
					this.sourceTokenList.push({ cancelKey, cancelExecutor })
				})
				this.cancelRepeatRequest()
				this.currentCancelTokenKey = cancelKey

				if (typeof this.requestCb === 'function') {
					this.requestCb(_config)
					this.requestCb = undefined
					return _config
				}

				return _config
			},
			error => Promise.reject(error)
		)
	}
	// 响应拦截器
	private interceptorsResponse() {
		this.axiosInstance.interceptors.response.use(
			response => {
				NProgress.done()

				const cancelKey = this.genUniqueKey(response.config)
				this.deleteCancelTokenByCancelKey(cancelKey)

				if (this.responseCb != undefined) {
					this.responseCb(response)
					this.responseCb = undefined
					return
				}

				return response.data
			},
			(error: HttpError) => {
				const _error = error
				if (this.currentCancelTokenKey) {
					const hasKey = this.sourceTokenList.filter(
						cancelToken => cancelToken.cancelKey === this.currentCancelTokenKey
					).length
					if (hasKey) {
						this.sourceTokenList = this.sourceTokenList.filter(
							cancelToken => cancelToken.cancelKey !== this.currentCancelTokenKey
						)
						this.currentCancelTokenKey = ''
					}
				}
				_error.isCancelRequest = Axios.isCancel(_error)
				NProgress.done()
				Promise.reject(_error)
			}
		)
	}
	/**
	 *
	 * @param url 请求地址
	 * @param method 请求方式
	 * @param date 请求参数
	 * @param interceptors 自定义拦截器
	 * @returns 请求结果
	 */
	public request(
		url: string,
		method: RequestMethods,
		date?: AxiosRequestConfig,
		interceptors?: HttpRequestConfig
	) {
		const options = Object.assign(defaultConfig, { url, method, date })
		if (interceptors?.requestCb) {
			this.requestCb = interceptors.requestCb
		}
		if (interceptors?.responseCb) {
			this.responseCb = interceptors.responseCb
		}
		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request(options)
				.then((res: unknown) => resolve(res))
				.catch(error => reject(error))
		})
	}

	public get(url: string, date?: AxiosRequestConfig, interceptors?: HttpRequestConfig) {
		return this.request(url, 'get', date, interceptors)
	}
	public post(url: string, date?: AxiosRequestConfig, interceptors?: HttpRequestConfig) {
		return this.request(url, 'post', date, interceptors)
	}
}
export default HttpRequest
