import { axios } from '@/utils';

export async function getWebsite() {
  return axios.get<Array<Site.Info>>(`/site/get/info`);
}
export async function getContentSelector() {
  return axios.get<Array<Site.Info>>(`/site/get/selector`);
}
export async function searchSiteName(name: string) {
  return axios.get<Array<Site.Info>>(`/site/find/name?name=${name}`);
}
export async function changeLinkState(id: string, state: 0 | 1) {
  return axios.get<boolean>(`/crawler/switch/link?_id=${id}&state=${state}`);
}
