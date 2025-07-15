import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { Result } from '../utils/result.ts'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiCallOptions<T = any> {
  path: string
  method?: HttpMethod
  body?: any
}

export async function apiCall<T>({ path, method = 'GET', body }: ApiCallOptions): Promise<Result<T>> {
  try {
    const config: AxiosRequestConfig = {
      url: `http://localhost:7000${path}`,
      method,
      headers: { 'Content-Type': 'application/json' },
      data: body,
      withCredentials: true,
    }

    const res = await axios<T>(config)

    if (!res || res.data === undefined || res.data === null) {
      console.error(`[apiCall] ❌ Axios empty response:`, res)
      return Result.failure({
        code: 'NO_DATA',
        message: 'Received empty response from server',
      })
    }
    return Result.success<T>(res.data)
  } catch (error) {
    const err = error as AxiosError
    console.error(`[apiCall] ❌ Axios error:`, err)

    return Result.failure({
      code: String(err.response?.status || 'AXIOS_ERROR'),
      message: err.response?.statusText || err.message || 'Unknown error',
    })
  }
}
