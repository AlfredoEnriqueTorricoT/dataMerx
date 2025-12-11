/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

/**
 * Tipo para función de setState de loading
 */
export type SetStateFn = (loading: boolean) => void
