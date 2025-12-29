/**
 * Tipos compartidos de UI
 */
export type ModalType =
  | 'Add'
  | 'Edit'
  | 'Delete'
  | 'Details'
  | 'Sim'
  | 'Transfer'
  | 'TransferRequest'
  | 'CancelTransfer'
  | 'ChangeStatus'
  | 'Filter'
  | 'AddImages'
  | 'AddEvent'
  | 'Events'
  | 'Confirm'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalState {
  open: boolean
  type: ModalType
  size: ModalSize
}

/**
 * Modelos relacionados
 */
export interface FilterItem {
  id: number
  name: string
  type: 'user' | 'platform'
}

export interface SimModel {
  id: number
  number: string
  imei: string
  code: string
  active: number
  dischargeDate: string | null
  installationDate: string | null
}

export interface SimApiResponse {
  id: number
  number: string
  imei: string
  code: string
  active: number
  discharge_date: string | null
  installation_date: string | null
}

export interface ModemMarkModel {
  id: number
  name: string
  detail: string
}

export interface ModemMarkApiResponse {
  id: number
  name: string
  detail: string
}

export interface PlatformModel {
  id: number
  name: string
  detail: string | null
  url: string
  email: string
  active: number
  credencial: string
}

export interface PlatformApiResponse {
  id: number
  name: string
  detail: string | null
  url: string
  email: string
  active: number
  credencial: string
}

export interface UserModel {
  id: number
  name: string
  email: string
}

/**
 * Modelo de Modem para la UI (camelCase)
 */
export interface ModemModel {
  id: number
  code: string
  imei: string
  active: number
  isSale: number
  simId: number | null
  markId: number
  platformId: number | null
  responsabilityHistoryId: number | null
  userResponsabilityId: number | null
  userSuccessorId: number | null
  isPending: number
  images: string[]
  sim: SimModel | null
  modemsMark: ModemMarkModel | null
  platform: PlatformModel | null
  responsability: UserModel | null
  successor: UserModel | null
}

/**
 * Respuesta de la API (snake_case)
 */
export interface ModemApiResponse {
  id: number
  code: string
  imei: string
  active: number
  is_sale: number
  sim_id: number | null
  mark_id: number
  platform_id: number | null
  responsability_history_id: number | null
  user_responsability_id: number | null
  user_successor_id: number | null
  is_pending: number
  images: string[]
  sim: SimApiResponse | null
  modems_mark: ModemMarkApiResponse | null
  platform: PlatformApiResponse | null
  responsability: UserModel | null
  successor: UserModel | null
  // Campos aplanados que vienen en la lista
  mark_modem_name?: string | null
  platform_name?: string | null
  sim_number?: string | null
}

/**
 * Payload para crear un Modem
 */
export interface CreateModemPayload {
  code: string
  imei: string
  mark_id: number
  active?: number
  is_sale?: number
  platform_id?: number | null
}

/**
 * Payload para actualizar un Modem
 */
export interface UpdateModemPayload {
  id: number
  code?: string
  imei?: string
  active?: number
  is_sale?: number
  sim_id?: number | null
  mark_id?: number
  platform_id?: number | null
  is_pending?: number
  user_responsability_id?: number | null
  user_successor_id?: number | null
}

/**
 * Payload para asociar SIM
 */
export interface AssignSimPayload {
  modem_id: number
  sim_id: number
}

/**
 * Payload para transferencia
 */
export interface TransferPayload {
  modem_id: number
  user_successor_id: number
}

/**
 * Payload para cambio de estado
 */
export interface ChangeStatusPayload {
  modem_id: number
  active: number
}

/**
 * Filtros de búsqueda
 */
export interface ModemFilters {
  code?: string
  imei?: string
  markId?: number
  platformId?: number
  active?: number
  isSale?: number
}

/**
 * Imagen de evento
 */
export interface EventImage {
  url: string
}

/**
 * Evento de Modem
 */
export interface ModemEventModel {
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

export interface ModemEventApiResponse {
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
