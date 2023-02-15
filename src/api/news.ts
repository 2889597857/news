import { getTodayZeroHour } from '@/utils';
import { axios } from './index';

export async function getNews(url: string) {
  return axios.get<NEWS.NewsItem>(`/news/getNews?url=${url}`);
}
export function getNewsLists(page = 1) {
  return axios.get<NEWS.NewsList>(`/news?page=${page}`);
}
export function updateNews(data: { id: string; news: string }) {
  return axios.post('/api/news/update', { data });
}

export function getReportNews(date = getTodayZeroHour()) {
  return axios.get<Array<NEWS.NewsItem>>(`/news/report?date=${date}`);
}

export function updateNewsState(data: NEWS.updateNewsState) {
  return axios.post<NEWS.updateNewsState>(`/news/updateNewsState`, data);
}

export function updateReportTime(data) {
  return axios.post(`/news/updateReportTime`, data);
}

export function getTaskInfo() {
  return axios.get(`/task`);
}

export function startTask() {
  return axios.get(`/task/create`);
}
