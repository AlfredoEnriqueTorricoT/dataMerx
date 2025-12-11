import { httpRequestWithAuth, transformApiData } from '../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../shared/types'
import { IWatchService } from './IWatchService'
import {
  WatchModel,
  WatchApiResponse,
  CreateWatchPayload,
  UpdateWatchPayload,
  ConfigureWatchPayload,
} from '../models/WatchModel'
import {
  adaptWatchResponseToModel,
  adaptWatchListResponseToModel,
} from '../adapters/watchAdapter'

export class WatchApiService implements IWatchService {
  async getWatches(platformId: string, setLoading?: SetStateFn): Promise<ApiResponse<WatchModel[]>> {
    const res = await httpRequestWithAuth.get<{ status: number; message: string; data: WatchApiResponse[] }>(
      `watch/${platformId}`,
      setLoading
    )
    return transformApiData(res, (data) => adaptWatchListResponseToModel(data.data || []))
  }

  async createWatch(payload: CreateWatchPayload, setLoading?: SetStateFn): Promise<ApiResponse<WatchModel>> {
    const res = await httpRequestWithAuth.post<{ status: number; message: string; data: WatchApiResponse }>(
      'watch',
      payload,
      setLoading
    )
    return transformApiData(res, (data) => adaptWatchResponseToModel(data.data))
  }

  async updateWatch(
    id: number,
    payload: UpdateWatchPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<WatchModel>> {
    const res = await httpRequestWithAuth.put<{ status: number; message: string; data: WatchApiResponse }>(
      `watch/${id}`,
      payload,
      setLoading
    )
    return transformApiData(res, (data) => adaptWatchResponseToModel(data.data))
  }

  async deleteWatch(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.delete<void>(`watch/${id}`, setLoading)
  }

  async configureWatch(
    payload: ConfigureWatchPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<WatchModel>> {
    const res = await httpRequestWithAuth.post<{ status: number; message: string; data: WatchApiResponse }>(
      'watch/getDataConfigForWatch',
      payload,
      setLoading
    )
    return transformApiData(res, (data) => adaptWatchResponseToModel(data.data))
  }
}
