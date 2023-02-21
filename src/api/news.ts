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

export function getContent(_id: string) {
  if (_id) {
    return axios.get(`/news/details?_id=${_id}`);
  }
  return false;
}

export function getReportNews(date = getTodayZeroHour(), isCount = false) {
  return axios.get<Array<NEWS.NewsItem> | number>(`/news/report?date=${date}&isCount=${isCount}`);
}
export function getReportNewsCount() {
  return getReportNews(getTodayZeroHour(), true);
}

export function updateNewsState(data) {
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
