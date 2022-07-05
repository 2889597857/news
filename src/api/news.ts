import { axios } from './index';

export async function getNews(page = 1) {
  return axios.get<NEWS.NewsList>('/api/news', {
    params: {
      page
    }
  });
}

export function updateNews(data: { id: string; news: string }) {
  return axios.post('/api/news/update', { data });
}
