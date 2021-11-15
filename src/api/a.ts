import axios from '@/utils/http'
let photos = '/photos'
interface photos {
	id: number
}
export const a = (data?: object, cb?: any) => axios.request<Array<photos>>(photos, 'get', data)
