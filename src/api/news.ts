import { axios } from './index';

export function getNews() {
  return axios.get('/api/news');
}

export function updateNews(data: { id: string; news: string }) {
  return axios.post('/api/news/update', data);
}
