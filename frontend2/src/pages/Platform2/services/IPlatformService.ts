import { ApiResponse, SetStateFn } from '../../../shared/types'
import {
  PlatformModel,
  WifiModel,
  CreatePlatformPayload,
  UpdatePlatformPayload,
  CreateWifiPayload,
  UpdateWifiPayload,
} from '../models/PlatformModel'

export interface IPlatformService {
  // CRUD Platforms
  getPlatforms(setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel[]>>
  getPlatformById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel>>
  createPlatform(payload: CreatePlatformPayload, setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel>>
  updatePlatform(id: number, payload: UpdatePlatformPayload, setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel>>
  deletePlatform(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>>

  // CRUD Wifis
  getWifis(platformId: number, setLoading?: SetStateFn): Promise<ApiResponse<WifiModel[]>>
  createWifi(payload: CreateWifiPayload, setLoading?: SetStateFn): Promise<ApiResponse<WifiModel>>
  updateWifi(id: number, payload: UpdateWifiPayload, setLoading?: SetStateFn): Promise<ApiResponse<WifiModel>>
  deleteWifi(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>>
}
