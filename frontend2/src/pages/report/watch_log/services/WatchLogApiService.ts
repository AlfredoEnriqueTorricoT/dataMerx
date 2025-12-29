import { httpRequestWithAuth, transformApiData } from '../../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../../shared/types'
import { IWatchLogService } from './IWatchLogService'
import { WatchLogModel, WatchLogApiResponse } from '../models/WatchLogModel'
import { adaptWatchLogListResponseToModel } from '../adapters/watchLogAdapter'

export class WatchLogApiService implements IWatchLogService {
  async getAll(setLoading?: SetStateFn): Promise<ApiResponse<WatchLogModel[]>> {
    const res = await httpRequestWithAuth.get<{ status: number; message: string; data: WatchLogApiResponse[] }>(
      'watch_log',
      setLoading
    )
    return transformApiData(res, (data) => adaptWatchLogListResponseToModel(data.data || []))
  }
}
