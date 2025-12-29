// Modelo UI (camelCase)
export interface WatchLogModel {
  id: number
  watchCode: string
  macAddress: string
  createdAt: string
}

// Respuesta API (snake_case)
export interface WatchLogApiResponse {
  id: number
  mac_address: string
  watch_id: number
  created_at: string
  updated_at: string
  watch_code: string
}
