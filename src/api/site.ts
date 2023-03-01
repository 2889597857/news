import { axios } from './index';

export async function getWebsite() {
  return axios.get<Array<Site.Info>>(`/site/info`);
}
export async function searchSiteName(name: string) {
  return axios.get<Array<Site.Info>>(`/site/find/name?name=${name}`);
}
