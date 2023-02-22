import { axios } from './index';

export async function getNew1234s(url: string) {
  return axios.get<NEWS.NewsItem>(`/news/getNews?url=${url}`);
}
