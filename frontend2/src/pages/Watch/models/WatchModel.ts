/**
 * Tipos compartidos de UI
 */
export type ModalType = 'Add' | 'Edit' | 'Delete' | 'Settings' | 'Details'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalState {
  open: boolean
  type: ModalType
  size: ModalSize
}

/**
 * Modelo de Watch para la UI (camelCase)
 */
export interface WatchModel {
  id: number
  code: string
  imei: string
  deviceName: string | null
  sigueloDeviceId: number | null
  platformId: number | null
  platformName?: string | null
  isPending: boolean
  responsabilityId: number | null
  userResponsabilityId: number | null
  userSuccessorId: number | null
  createdAt?: string
  updatedAt?: string
}

/**
 * Respuesta de la API (snake_case)
 */
export interface WatchApiResponse {
  id: number
  code: string
  imei: string
  device_name: string | null
  siguelo_device_id: number | null
  platform_id: number | null
  platform_name?: string | null
  is_pending: boolean | number
  responsability_id: number | null
  user_responsability_id: number | null
  user_successor_id: number | null
  created_at?: string
  updated_at?: string
}

/**
 * DTO para crear un Watch
 */
export interface CreateWatchDto {
  imei: string
  code: string
  platformId?: number | null
  deviceName?: string | null
}

/**
 * DTO para actualizar un Watch
 */
export interface UpdateWatchDto {
  id: number
  imei?: string
  code?: string
  platformId?: number | null
  deviceName?: string | null
  sigueloDeviceId?: number | null
  isPending?: boolean
  responsabilityId?: number | null
  userResponsabilityId?: number | null
  userSuccessorId?: number | null
}

/**
 * DTO para configurar un Watch
 */
export interface ConfigureWatchDto {
  id: number
  platformId: number
  deviceImei: string
}

/**
 * Payload para la API (snake_case) - Crear
 */
export interface CreateWatchPayload {
  imei: string
  code: string
  platform_id?: number | null
  device_name?: string | null
}

/**
 * Payload para la API (snake_case) - Actualizar
 */
export interface UpdateWatchPayload {
  id: number
  imei?: string
  code?: string
  platform_id?: number | null
  device_name?: string | null
  siguelo_device_id?: number | null
  is_pending?: boolean | number
  responsability_id?: number | null
  user_responsability_id?: number | null
  user_successor_id?: number | null
}

/**
 * Payload para configurar Watch
 */
export interface ConfigureWatchPayload {
  id: number
  platform_id: number
  device_imei: string
}
