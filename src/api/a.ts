import axios from '@/utils/request'
let photos = '/photos'
interface photos {
	id: number
}
export const a = (data?: object, cb?: any) => axios.request<Array<photos>>(photos, 'get', data)
