/**
 * Tipos compartidos de UI
 */
export type ModalType =
  | 'Add'
  | 'Edit'
  | 'Delete'
  | 'Details'
  | 'ChangeStatus'
  | 'AddImages'
  | 'AddEvent'
  | 'Events'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalState {
  open: boolean
  type: ModalType
  size: ModalSize
}

/**
 * Modelo de Sim para la UI (camelCase)
 */
export interface SimModel {
  id: number
  number: string
  imei: string
  code: string
  active: number
  dischargeDate: string | null
  installationDate: string | null
  images: string[]
}

/**
 * Respuesta de la API (snake_case)
 */
export interface SimApiResponse {
  id: number
  number: string
  imei: string
  code: string
  active: number
  discharge_date: string | null
  installation_date: string | null
  images?: string[]
}

/**
 * Detalles del Sim con relaciones
 */
export interface SimDetailsModel {
  sim: SimModel
  car: CarModel | null
  modem: ModemModel | null
}

export interface SimDetailsApiResponse {
  sim: SimApiResponse
  car: CarApiResponse | null
  modem: ModemApiResponse | null
}

/**
 * Modelo de Vehículo relacionado
 */
export interface CarModel {
  id: number
  name: string
  placa: string
  mark: string
  model: string
  platform: { id: number; name: string } | null
}

export interface CarApiResponse {
  id: number
  name: string
  placa: string
  mark: string
  model: string
  platform: { id: number; name: string } | null
}

/**
 * Modelo de Modem relacionado
 */
export interface ModemModel {
  id: number
  code: string
  imei: string
  active: number
  modemsMark: { id: number; name: string } | null
}

export interface ModemApiResponse {
  id: number
  code: string
  imei: string
  active: number
  modems_mark: { id: number; name: string } | null
}

/**
 * Payload para crear un Sim
 */
export interface CreateSimPayload {
  number: string
  imei: string
}

/**
 * Payload para actualizar un Sim
 */
export interface UpdateSimPayload {
  id: number
  number?: string
  imei?: string
  active?: number
}

/**
 * Payload para cambio de estado
 */
export interface ChangeStatusPayload {
  sim_id: number
  active: number
}

/**
 * Imagen de evento
 */
export interface EventImage {
  url: string
}

/**
 * Evento de Sim
 */
export interface SimEventModel {
  id: number
  title: string
  detail: string
  typeId: number
  carId: number | null
  modemId: number | null
  simId: number | null
  platformId: number | null
  watchId: number | null
  userId: number | null
  createdAt: string
  car?: { name: string } | null
  modem?: { id: number; code: string; imei: string } | null
  sim?: { number: string } | null
  platform?: { name: string } | null
  images?: EventImage[]
}

export interface SimEventApiResponse {
  id: number
  title: string
  detail: string
  type_id: number
  car_id: number | null
  modem_id: number | null
  sim_id: number | null
  platform_id: number | null
  watch_id: number | null
  user_id: number | null
  created_at: string
  car?: { name: string } | null
  modem?: { id: number; code: string; imei: string } | null
  sim?: { number: string } | null
  platform?: { name: string } | null
  images?: { url: string }[]
}
