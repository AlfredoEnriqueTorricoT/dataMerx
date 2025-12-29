import {
  PlatformApiResponse,
  PlatformModel,
  WifiApiResponse,
  WifiModel,
} from '../models/PlatformModel'

// ==================== Wifi Adapters ====================
export function adaptWifiResponseToModel(response: WifiApiResponse): WifiModel {
  return {
    id: response.id,
    ssid: response.ssid,
    platformId: response.platform_id,
    createdAt: response.created_at,
    updatedAt: response.updated_at,
  }
}

export function adaptWifiListResponseToModel(responses: WifiApiResponse[]): WifiModel[] {
  return responses.map(adaptWifiResponseToModel)
}

// ==================== Platform Adapters ====================
export function adaptPlatformResponseToModel(response: PlatformApiResponse): PlatformModel {
  return {
    id: response.id,
    name: response.name,
    detail: response.detail,
    url: response.url,
    email: response.email,
    active: response.active,
    credencial: response.credencial,
    createdAt: response.created_at,
    updatedAt: response.updated_at,
    wifis: response.wifis ? adaptWifiListResponseToModel(response.wifis) : undefined,
  }
}

export function adaptPlatformListResponseToModel(responses: PlatformApiResponse[]): PlatformModel[] {
  return responses.map(adaptPlatformResponseToModel)
}
