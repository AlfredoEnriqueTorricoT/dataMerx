import { httpRequestWithAuth, transformApiData } from '../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../shared/types'
import { IPlatformCountService } from './IPlatformCountService'
import {
  PlatformCountModel,
  PlatformCountApiResponse,
  CreatePlatformCountPayload,
} from '../models/PlatformCountModel'
import { adaptPlatformCountListResponseToModel } from '../adapters/platformCountAdapter'

export class PlatformCountApiService implements IPlatformCountService {
  async getPlatformCounts(setLoading?: SetStateFn): Promise<ApiResponse<PlatformCountModel[]>> {
    const res = await httpRequestWithAuth.get<{ status: number; message: string; data: PlatformCountApiResponse[] }>(
      'platform/count',
      setLoading
    )
    return transformApiData(res, (data) => adaptPlatformCountListResponseToModel(data.data || []))
  }

  async createPlatformCount(
    payload: CreatePlatformCountPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<PlatformCountModel>> {
    const res = await httpRequestWithAuth.post<{ status: number; message: string; data: PlatformCountApiResponse }>(
      'platform/count',
      payload,
      setLoading
    )
    return transformApiData(res, (data) => ({
      name: data.data.name,
      count: data.data.count,
    }))
  }
}
