import { axios } from './index';

export async function getWebsite() {
  return axios.get<Array<Site.Info>>(`/site/info`);
}
