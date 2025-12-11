import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { ApiResponse, SetStateFn } from '../types'

const API_URL = 'http://localhost:8000/api/'

export interface HttpConfig {
  baseURL?: string
  timeout?: number
}

export const createApiInstance = (config?: HttpConfig): AxiosInstance => {
  const baseURL = config?.baseURL || API_URL

  const instance = axios.create({
    baseURL,
    timeout: config?.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Interceptor para manejar FormData correctamente
  instance.interceptors.request.use(
    (config) => {
      if (config.data instanceof FormData) {
        if (config.headers) {
          delete config.headers['Content-Type']
          delete config.headers['content-type']
          config.headers['Content-Type'] = undefined
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return instance
}

const getAuthToken = (): string | null => {
  return localStorage.getItem('userToken')
}

// Instancia singleton de Axios
const defaultApiInstance = createApiInstance()

// Helper para crear headers con autenticación
const createAuthHeaders = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getAuthToken()
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }
}

const executeRequest = async <T>(
  api: AxiosInstance,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
  setLoading?: SetStateFn
): Promise<ApiResponse<T>> => {
  setLoading?.(true)

  try {
    let response: AxiosResponse<T>

    switch (method) {
      case 'GET':
        response = await api.get<T>(url, config)
        break
      case 'POST':
        response = await api.post<T>(url, data, config)
        break
      case 'PUT':
        response = await api.put<T>(url, data, config)
        break
      case 'DELETE':
        response = await api.delete<T>(url, config)
        break
      case 'PATCH':
        response = await api.patch<T>(url, data, config)
        break
    }

    setLoading?.(false)

    return {
      status: response.status,
      message: 'Success',
      data: response.data,
    }
  } catch (error: any) {
    setLoading?.(false)

    // Log interno del error
    if (process.env.NODE_ENV === 'development') {
      console.error('[HTTP Service Error]', {
        method,
        url,
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        error: error,
      })
    }

    // Retorna respuesta con data null en caso de error
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'Request failed',
      data: null as unknown as T,
    }
  }
}

export const httpRequest = {
  get: async <T>(
    url: string,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(defaultApiInstance, 'GET', url, undefined, config, setLoading)
  },

  post: async <T>(
    url: string,
    data: any,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(defaultApiInstance, 'POST', url, data, config, setLoading)
  },

  put: async <T>(
    url: string,
    data: any,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(defaultApiInstance, 'PUT', url, data, config, setLoading)
  },

  patch: async <T>(
    url: string,
    data: any,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(defaultApiInstance, 'PATCH', url, data, config, setLoading)
  },

  delete: async <T>(
    url: string,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(defaultApiInstance, 'DELETE', url, undefined, config, setLoading)
  },
}

export const httpRequestWithAuth = {
  get: async <T>(
    url: string,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(
      defaultApiInstance,
      'GET',
      url,
      undefined,
      createAuthHeaders(config),
      setLoading
    )
  },

  post: async <T>(
    url: string,
    data: any,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(
      defaultApiInstance,
      'POST',
      url,
      data,
      createAuthHeaders(config),
      setLoading
    )
  },

  postFormData: async <T>(
    url: string,
    formData: FormData,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const token = getAuthToken()

    const formDataConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }

    return executeRequest<T>(defaultApiInstance, 'POST', url, formData, formDataConfig, setLoading)
  },

  put: async <T>(
    url: string,
    data: any,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(
      defaultApiInstance,
      'PUT',
      url,
      data,
      createAuthHeaders(config),
      setLoading
    )
  },

  patch: async <T>(
    url: string,
    data: any,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(
      defaultApiInstance,
      'PATCH',
      url,
      data,
      createAuthHeaders(config),
      setLoading
    )
  },

  delete: async <T>(
    url: string,
    setLoading?: SetStateFn,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return executeRequest<T>(
      defaultApiInstance,
      'DELETE',
      url,
      undefined,
      createAuthHeaders(config),
      setLoading
    )
  },
}

/**
 * Helper para transformar datos de API usando un adapter
 */
export const transformApiData = <T, R>(
  response: ApiResponse<T>,
  adapter: (data: T) => R
): ApiResponse<R> => {
  if (response.data === null) {
    return {
      ...response,
      data: null as unknown as R,
    }
  }
  return {
    ...response,
    data: adapter(response.data),
  }
}
