import { axios } from './index';

export async function getNews() {
  return axios.get<NEWS.NewsList>('/api/news', {
    params: {
      page: 1
    }
  });
}

export function updateNews(data: { id: string; news: string }) {
  return axios.post('/api/news/update', data);
}
