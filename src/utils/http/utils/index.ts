// import { fetchUpdateToken } from '@/api';
// import { useAuthStore } from '@/store';
// import type { AxiosRequestConfig } from 'axios';
// import { storageLocal } from '../../storage';

// /**
//  * 刷新token
//  * @param axiosConfig - token失效时的请求配置
//  */
// export default async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
//   const { resetAuthStore } = useAuthStore();
//   const refreshToken = storageLocal.getItem('refreshToken') || '';
//   const { data } = await fetchUpdateToken(refreshToken);
//   if (data) {
//     storageLocal.setItem('token', data.token);
//     storageLocal.setItem('refreshToken', data.refreshToken);

//     const config = { ...axiosConfig };
//     if (config.headers) {
//       config.headers.Authorization = data.token;
//     }
//     return config;
//   }

//   resetAuthStore();
//   return null;
// }
export default async function handleRefreshToken(a) {
  return a;
}
