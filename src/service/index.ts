import ServerHttp from './http'
import Api from './api'

export const env = process.env.NODE_ENV
export const baseURL = process.env.REACT_APP_BASE_URL
export const token = process.env.REACT_APP_API_KEY

const http = new ServerHttp()
export const api = new Api(http.get())
