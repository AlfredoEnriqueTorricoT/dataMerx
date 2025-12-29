import { ApiResponse, SetStateFn } from '../../../../shared/types'
import { WatchLogModel } from '../models/WatchLogModel'

export interface IWatchLogService {
  getAll(setLoading?: SetStateFn): Promise<ApiResponse<WatchLogModel[]>>
}
