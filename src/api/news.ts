import { getTodayZeroHour } from '@/utils';
import { axios } from './index';

export async function getNews(url: string) {
  return axios.get<NEWS.NewsItem>(`/news/crawler?url=${url}`);
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

export function getReportNews(date = getTodayZeroHour(), isCount = 0) {
  return axios.get<Array<NEWS.NewsItem> | number>(`/news/report?date=${date}&isCount=${isCount}`);
}
export function getReportNewsCount() {
  return getReportNews(getTodayZeroHour(), 1);
}
type NewsState = {
  _id: string;
  state: 0 | 1 | 2;
};

export function updateNewsState(data: NewsState) {
  return axios.post<NEWS.updateNewsState>(`/news/update/state`, data);
}

export function updateReportTime(data) {
  return axios.post(`/news/update/time`, data);
}

export function getTaskInfo() {
  return axios.get(`/task`);
}

export function startTask() {
  return axios.get<{ cooldown: boolean; creationTime: string }>(`/task/create`);
}
