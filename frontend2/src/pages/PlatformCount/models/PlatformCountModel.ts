/**
 * Tipos compartidos de UI
 */
export type ModalType = 'Add' | 'Details'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalState {
  open: boolean
  type: ModalType
  size: ModalSize
}

/**
 * Modelo de PlatformCount para la UI (camelCase)
 */
export interface PlatformCountModel {
  name: string
  count: number
}

/**
 * Respuesta de la API (snake_case) - en este caso coincide con el modelo
 */
export interface PlatformCountApiResponse {
  name: string
  count: number
}

/**
 * Payload para crear (POST)
 */
export interface CreatePlatformCountPayload {
  name: string
  count?: number
}
