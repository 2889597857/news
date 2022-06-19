import { axios } from './index';

export async function getNews() {
 return await axios.get('/api/news');
}
