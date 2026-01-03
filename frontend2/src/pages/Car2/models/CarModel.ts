// Tipos de UI compartidos
export type ModalType =
  | 'Add'
  | 'Edit'
  | 'Details'
  | 'Modem'
  | 'Watch'
  | 'AddEvent'
  | 'AddImages'
  | 'Events'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalState {
  open: boolean
  type: ModalType
  size: ModalSize
}

// Modelo UI (camelCase)
export interface CarModel {
  id: number
  name: string | null
  mark: string
  model: string
  placa: string
  platformId: number | null
  platformName: string | null
  modemId: number | null
  watchId: number | null
  active: number
  images: ImageModel[]
}

// Respuesta API (snake_case)
export interface CarApiResponse {
  id: number
  name: string | null
  mark: string
  model: string
  placa: string
  platform_id: number | null
  modem_id: number | null
  watch_id: number | null
  active: number
  images?: ImageModel[]
  platform?: {
    id: number
    name: string
  }
}

// Modelo de imagen
export interface ImageModel {
  id: number
  url: string
}

// Modelo de plataforma
export interface PlatformModel {
  id: number
  name: string
}

// Modelo de módem
export interface ModemModel {
  id: number
  code: string
  imei: string
  markId: number | null
  active: number
  modemsMarkName?: string | null
}

// Modelo de módem API response
export interface ModemApiResponse {
  id: number
  code: string
  imei: string
  mark_id: number | null
  active: number
  modems_mark?: {
    id: number
    name: string
  }
}

// Modelo de sim
export interface SimModel {
  id: number
  number: string
  imei: string
  active: number
  code?: string
}

// Modelo de reloj en detalles
export interface CarDetailWatchModel {
  id: number
  code: string
  imei: string
  deviceName: string | null
}

// Modelo de detalles del carro
export interface CarDetailsModel {
  car: CarDetailCarModel
  modem: CarDetailModemModel | null
  watch: CarDetailWatchModel | null
  sim: SimModel | null
}

export interface CarDetailCarModel {
  id: number
  name: string | null
  mark: string
  model: string
  placa: string
  platformId: number | null
  platformName: string | null
  modemId: number | null
  images: ImageModel[]
}

export interface CarDetailModemModel {
  id: number
  code: string
  imei: string
  markId: number | null
  markName: string | null
  active: number
}

// Respuesta API de detalles
export interface CarDetailsApiResponse {
  car: {
    id: number
    name: string | null
    mark: string
    model: string
    placa: string
    platform_id: number | null
    modem_id: number | null
    images: ImageModel[]
    platform?: {
      id: number
      name: string
    }
  }
  modem: {
    id: number
    code: string
    imei: string
    mark_id: number | null
    active: number
    modems_mark?: {
      id: number
      name: string
    }
  } | null
  watch: {
    id: number
    code: string
    imei: string
    device_name: string | null
  } | null
  sim: SimModel | null
}

// Modelo de evento
export interface CarEventModel {
  id: number
  title: string
  detail: string
  typeId: number
  carId: number
  watchId: number | null
  watchImei: string | null
  modemId: number | null
  modemImei: string | null
  createdAt: string
  images: ImageModel[]
}

// Respuesta API de evento
export interface CarEventApiResponse {
  id: number
  title: string
  detail: string
  type_id: number
  car_id: number
  watch_id: number | null
  modem_id: number | null
  created_at: string
  images: ImageModel[]
  watch?: {
    id: number
    imei: string
    code: string
  } | null
  modem?: {
    id: number
    imei: string
    code: string
  } | null
}

// Payloads para API
export interface CreateCarPayload {
  mark: string
  model: string
  placa: string
  platform_id?: number
}

export interface UpdateCarPayload {
  id: number
  mark: string
  model: string
  placa: string
  platform_id?: number
}

export interface AssignModemPayload {
  id: number
  modem_id: number
  name: string
  confirm?: boolean
}

export interface AssignWatchPayload {
  id: number
  watch_id: number
  name?: string
  confirm?: boolean
}

// Modelo de reloj
export interface WatchModel {
  id: number
  code: string
  imei: string
  deviceName: string | null
  platformId: number | null
  platformName: string | null
}

// Modelo de reloj API response
export interface WatchApiResponse {
  id: number
  code: string
  imei: string
  device_name: string | null
  platform_id: number | null
  platform_name?: string | null
}
