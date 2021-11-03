import axios from '@/utils/http'
let photos = '/photos'
export const a = (data?: object, cb?: any) => axios.request(photos, 'get', {})
