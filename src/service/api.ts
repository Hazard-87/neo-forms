import { AxiosInstance } from 'axios'

class Api {
  private _apiInstance: AxiosInstance

  constructor(apiInstance: AxiosInstance) {
    this._apiInstance = apiInstance
  }

  result() {
    return {
      data: [] as any
    }
  }

  getCities(data: { query: string }) {
    const url = '4_1/rs/suggest/address'
    return this.post(url, data)
  }

  async post(url: string, data: { query: string }) {
    const result = this.result()
    try {
      const response = await this._apiInstance.post(url, data)
      if (response?.status === 200 && response?.data) {
        result.data = response.data.suggestions
      }
    } catch (e) {
      throw e
    }
    return result
  }
}

export default Api
