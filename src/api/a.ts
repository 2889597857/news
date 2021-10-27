import axios from '@/utils/http'
let photos = '/photos'
export const a = () => axios.request(photos, 'get')
