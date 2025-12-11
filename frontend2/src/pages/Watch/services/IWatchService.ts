import { ApiResponse, SetStateFn } from '../../../shared/types'
import {
  WatchModel,
  CreateWatchPayload,
  UpdateWatchPayload,
  ConfigureWatchPayload,
} from '../models/WatchModel'

export interface IWatchService {
  getWatches(platformId: string, setLoading?: SetStateFn): Promise<ApiResponse<WatchModel[]>>
  createWatch(payload: CreateWatchPayload, setLoading?: SetStateFn): Promise<ApiResponse<WatchModel>>
  updateWatch(id: number, payload: UpdateWatchPayload, setLoading?: SetStateFn): Promise<ApiResponse<WatchModel>>
  deleteWatch(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>>
  configureWatch(payload: ConfigureWatchPayload, setLoading?: SetStateFn): Promise<ApiResponse<WatchModel>>
}
