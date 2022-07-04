import { axios } from './index';

export async function getNews() {
  // eslint-disable-next-line no-return-await
  return await axios.get('/api/news?page=1', {
    params: {
      page: 1
    }
  });
}

export function updateNews(data: { id: string; news: string }) {
  return axios.post('/api/news/update', data);
}
