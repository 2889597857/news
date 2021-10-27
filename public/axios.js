// import Axios from "axios";
// import NProgress from "../progress";
// import { genConfig } from "./config";
// import { transformConfigByMethod } from "./utils";
// class EnclosureHttp {
//     constructor() {
//         // axios取消对象
//         this.CancelToken = Axios.CancelToken;
//         // 取消的凭证数组
//         this.sourceTokenList = [];
//         // 记录当前这一次cancelToken的key
//         this.currentCancelTokenKey = "";
//         this.beforeRequestCallback = undefined;
//         this.beforeResponseCallback = undefined;
//         this.httpInterceptorsRequest();
//         this.httpInterceptorsResponse();
//     }
//     get cancelTokenList () {
//         return this.sourceTokenList;
//     }
//     // eslint-disable-next-line class-methods-use-this
//     set cancelTokenList (value) {
//         throw new Error("cancelTokenList不允许赋值");
//     }
//     /**
//      * @description 私有构造不允许实例化
//      * @returns void 0
//      */
//     // constructor() {}
//     /**
//      * @description 生成唯一取消key
//      * @param config axios配置
//      * @returns string
//      */
//     // eslint-disable-next-line class-methods-use-this
//     static genUniqueKey (config) {
//         return `${config.url}--${JSON.stringify(config.data)}`;
//     }
//     /**
//      * @description 取消重复请求
//      * @returns void 0
//      */
//     cancelRepeatRequest () {
//         const temp = {};
//         this.sourceTokenList = this.sourceTokenList.reduce((res, cancelToken) => {
//             const { cancelKey, cancelExecutor } = cancelToken;
//             if (!temp[cancelKey]) {
//                 temp[cancelKey] = true;
//                 res.push(cancelToken);
//             }
//             else {
//                 cancelExecutor();
//             }
//             return res;
//         }, []);
//     }
//     /**
//      * @description 删除指定的CancelToken
//      * @returns void 0
//      */
//     deleteCancelTokenByCancelKey (cancelKey) {
//         this.sourceTokenList =
//             this.sourceTokenList.length < 1
//                 ? this.sourceTokenList.filter(cancelToken => cancelToken.cancelKey !== cancelKey)
//                 : [];
//     }
//     /**
//      * @description 拦截请求
//      * @returns void 0
//      */
//     httpInterceptorsRequest () {
//         EnclosureHttp.axiosInstance.interceptors.request.use((config) => {
//             const $config = config;
//             NProgress.start(); // 每次切换页面时，调用进度条
//             const cancelKey = EnclosureHttp.genUniqueKey($config);
//             $config.cancelToken = new this.CancelToken((cancelExecutor) => {
//                 this.sourceTokenList.push({ cancelKey, cancelExecutor });
//             });
//             this.cancelRepeatRequest();
//             this.currentCancelTokenKey = cancelKey;
//             // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
//             if (typeof this.beforeRequestCallback === "function") {
//                 this.beforeRequestCallback($config);
//                 this.beforeRequestCallback = undefined;
//                 return $config;
//             }
//             if (EnclosureHttp.initConfig.beforeRequestCallback) {
//                 EnclosureHttp.initConfig.beforeRequestCallback($config);
//                 return $config;
//             }
//             return $config;
//         }, error => {
//             return Promise.reject(error);
//         });
//     }
//     /**
//      * @description 清空当前cancelTokenList
//      * @returns void 0
//      */
//     clearCancelTokenList () {
//         this.sourceTokenList.length = 0;
//     }
//     /**
//      * @description 拦截响应
//      * @returns void 0
//      */
//     httpInterceptorsResponse () {
//         const instance = EnclosureHttp.axiosInstance;
//         instance.interceptors.response.use((response) => {
//             // 请求每次成功一次就删除当前canceltoken标记
//             const cancelKey = EnclosureHttp.genUniqueKey(response.config);
//             this.deleteCancelTokenByCancelKey(cancelKey);
//             // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
//             if (typeof this.beforeResponseCallback === "function") {
//                 this.beforeResponseCallback(response);
//                 this.beforeResponseCallback = undefined;
//                 return response.data;
//             }
//             if (EnclosureHttp.initConfig.beforeResponseCallback) {
//                 EnclosureHttp.initConfig.beforeResponseCallback(response);
//                 return response.data;
//             }
//             NProgress.done();
//             return response.data;
//         }, (error) => {
//             const $error = error;
//             // 判断当前的请求中是否在 取消token数组理存在，如果存在则移除（单次请求流程）
//             if (this.currentCancelTokenKey) {
//                 const haskey = this.sourceTokenList.filter(cancelToken => cancelToken.cancelKey === this.currentCancelTokenKey).length;
//                 if (haskey) {
//                     this.sourceTokenList = this.sourceTokenList.filter(cancelToken => cancelToken.cancelKey !== this.currentCancelTokenKey);
//                     this.currentCancelTokenKey = "";
//                 }
//             }
//             $error.isCancelRequest = Axios.isCancel($error);
//             NProgress.done();
//             // 所有的响应异常 区分来源为取消请求/非取消请求
//             return Promise.reject($error);
//         });
//     }
//     request (method, url, param, axiosConfig) {
//         const config = transformConfigByMethod(param, Object.assign({
//             method,
//             url
//         }, axiosConfig));
//         // 单独处理自定义请求/响应回掉
//         if (axiosConfig === null || axiosConfig === void 0 ? void 0 : axiosConfig.beforeRequestCallback) {
//             this.beforeRequestCallback = axiosConfig.beforeRequestCallback;
//         }
//         if (axiosConfig === null || axiosConfig === void 0 ? void 0 : axiosConfig.beforeResponseCallback) {
//             this.beforeResponseCallback = axiosConfig.beforeResponseCallback;
//         }
//         return new Promise((resolve, reject) => {
//             EnclosureHttp.axiosInstance
//                 .request(config)
//                 .then((response) => {
//                     resolve(response);
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         });
//     }
//     post (url, params, config) {
//         return this.request("post", url, params, config);
//     }
//     get (url, params, config) {
//         return this.request("get", url, params, config);
//     }
// }
// // 初始化配置对象
// EnclosureHttp.initConfig = {};
// // 保存当前Axios实例对象
// EnclosureHttp.axiosInstance = Axios.create(genConfig());
// export default EnclosureHttp;