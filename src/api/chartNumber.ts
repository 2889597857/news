import { axios } from '@/utils';

export async function getFu() {
  return axios.get<[{ name: string; count: number; report: number }]>('/chart/news');
}
export async function getTaskCount() {
  return axios.get<[{ time: string; count: number; success: number }]>('/chart/task');
}
