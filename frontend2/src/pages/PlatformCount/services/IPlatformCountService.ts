import { ApiResponse, SetStateFn } from '../../../shared/types'
import { PlatformCountModel, CreatePlatformCountPayload } from '../models/PlatformCountModel'

export interface IPlatformCountService {
  getPlatformCounts(setLoading?: SetStateFn): Promise<ApiResponse<PlatformCountModel[]>>
  createPlatformCount(payload: CreatePlatformCountPayload, setLoading?: SetStateFn): Promise<ApiResponse<PlatformCountModel>>
}
