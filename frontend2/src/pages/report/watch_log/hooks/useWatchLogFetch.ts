import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { WatchLogApiService } from '../services/WatchLogApiService'
import { WatchLogModel } from '../models/WatchLogModel'
import { setWatchLogList } from '../slices/watchLogSlice'

interface FetchResult {
  success: boolean
  message: string
  data?: WatchLogModel[]
}

export const useWatchLogFetch = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const service = useMemo(() => new WatchLogApiService(), [])

  const fetchLogs = async (): Promise<FetchResult> => {
    const result = await service.getAll(setIsLoading)
    if (result.data) {
      dispatch(setWatchLogList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  return {
    isLoading,
    fetchLogs,
  }
}
