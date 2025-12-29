// ==================== API Response Types ====================
export interface PlatformApiResponse {
  id: number
  name: string
  detail: string | null
  url: string | null
  email: string | null
  active: number
  credencial: string | null
  created_at?: string
  updated_at?: string
  wifis?: WifiApiResponse[]
}

export interface WifiApiResponse {
  id: number
  ssid: string
  platform_id: number
  created_at?: string
  updated_at?: string
}

// ==================== Frontend Models ====================
export interface PlatformModel {
  id: number
  name: string
  detail: string | null
  url: string | null
  email: string | null
  active: number
  credencial: string | null
  createdAt?: string
  updatedAt?: string
  wifis?: WifiModel[]
}

export interface WifiModel {
  id: number
  ssid: string
  platformId: number
  createdAt?: string
  updatedAt?: string
}

// ==================== Payloads ====================
export interface CreatePlatformPayload {
  name: string
  detail?: string
  url?: string
  email?: string
  password?: string
}

export interface UpdatePlatformPayload {
  name?: string
  detail?: string
  url?: string
  email?: string
  password?: string
}

export interface CreateWifiPayload {
  ssid: string
  password: string
  platform_id: number
}

export interface UpdateWifiPayload {
  ssid?: string
}

// ==================== Modal Types ====================
export type PlatformModalType = 'Add' | 'Edit' | 'Wifi' | null
