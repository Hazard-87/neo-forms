import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { baseURL, token } from './index'

class API {
  public config: AxiosRequestConfig

  public instance: AxiosInstance

  constructor() {
    this.config = {
      baseURL,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mode: 'cors',
      headers: {
        Authorization: 'Token ' + token
      }
    }
    this.instance = axios.create({
      ...this.config
    })
  }

  get() {
    return this.instance
  }
}

export default API
