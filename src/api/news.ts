import { axios } from './index';

export async function getNews() {
  // eslint-disable-next-line no-return-await
  return await axios.get('/api/news');
}
