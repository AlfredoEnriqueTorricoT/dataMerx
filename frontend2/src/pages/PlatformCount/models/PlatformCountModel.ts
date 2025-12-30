/**
 * Tipos compartidos de UI
 */
export type ModalType = 'Add' | 'Details' | 'ModemList'
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
  id: number
  name: string
  count: number
}

/**
 * Respuesta de la API (snake_case)
 */
export interface PlatformCountApiResponse {
  id: number
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
