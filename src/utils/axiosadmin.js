import axios from 'axios'
import { baseURL } from './constant'

const instance = axios.create({
    baseURL: baseURL,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem('admin')

    return config
})

export default instance