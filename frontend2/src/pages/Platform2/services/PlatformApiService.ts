import { httpRequestWithAuth, transformApiData } from '../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../shared/types'
import { IPlatformService } from './IPlatformService'
import {
  PlatformModel,
  PlatformApiResponse,
  WifiModel,
  WifiApiResponse,
  CreatePlatformPayload,
  UpdatePlatformPayload,
  CreateWifiPayload,
  UpdateWifiPayload,
} from '../models/PlatformModel'
import {
  adaptPlatformResponseToModel,
  adaptPlatformListResponseToModel,
  adaptWifiResponseToModel,
  adaptWifiListResponseToModel,
} from '../adapters/platformAdapter'

type ApiListResponse<T> = { status: number; message: string; data: T[] }
type ApiSingleResponse<T> = { status: number; message: string; data: T }

export class PlatformApiService implements IPlatformService {
  // CRUD Platforms
  async getPlatforms(setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<PlatformApiResponse>>('platform', setLoading)
    return transformApiData(res, (data) => adaptPlatformListResponseToModel(data.data || []))
  }

  async getPlatformById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel>> {
    const res = await httpRequestWithAuth.get<ApiSingleResponse<PlatformApiResponse>>(`platform/${id}`, setLoading)
    return transformApiData(res, (data) => adaptPlatformResponseToModel(data.data))
  }

  async createPlatform(payload: CreatePlatformPayload, setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel>> {
    const res = await httpRequestWithAuth.post<ApiSingleResponse<PlatformApiResponse>>('platform', payload, setLoading)
    return transformApiData(res, (data) => adaptPlatformResponseToModel(data.data))
  }

  async updatePlatform(id: number, payload: UpdatePlatformPayload, setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel>> {
    const res = await httpRequestWithAuth.put<ApiSingleResponse<PlatformApiResponse>>(`platform/${id}`, payload, setLoading)
    return transformApiData(res, (data) => adaptPlatformResponseToModel(data.data))
  }

  async deletePlatform(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.delete<void>(`platform/${id}`, setLoading)
  }

  // CRUD Wifis
  async getWifis(platformId: number, setLoading?: SetStateFn): Promise<ApiResponse<WifiModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<WifiApiResponse>>(`platform/${platformId}/wifi`, setLoading)
    return transformApiData(res, (data) => adaptWifiListResponseToModel(data.data || []))
  }

  async createWifi(payload: CreateWifiPayload, setLoading?: SetStateFn): Promise<ApiResponse<WifiModel>> {
    const res = await httpRequestWithAuth.post<ApiSingleResponse<WifiApiResponse>>('wifi', payload, setLoading)
    return transformApiData(res, (data) => adaptWifiResponseToModel(data.data))
  }

  async updateWifi(id: number, payload: UpdateWifiPayload, setLoading?: SetStateFn): Promise<ApiResponse<WifiModel>> {
    const res = await httpRequestWithAuth.put<ApiSingleResponse<WifiApiResponse>>(`wifi/${id}`, payload, setLoading)
    return transformApiData(res, (data) => adaptWifiResponseToModel(data.data))
  }

  async deleteWifi(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.delete<void>(`wifi/${id}`, setLoading)
  }
}
