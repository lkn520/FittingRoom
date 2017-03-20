import axios from 'axios'

export const testget = params => axios.get('url', {params: params}).then(res => res.data)

export const testpost = params => axios.post('url', params).then(res => res.data)
