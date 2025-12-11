import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { WatchApiService } from '../services/WatchApiService'
import { WatchModel, CreateWatchPayload, UpdateWatchPayload, ConfigureWatchPayload } from '../models/WatchModel'
import { setWatchList, addWatch, updateWatchInList, removeWatch } from '../slices/watchSlice'

interface FetchResult {
  success: boolean
  message: string
  data?: WatchModel[]
}

interface OperationResult {
  success: boolean
  message: string
  data?: WatchModel
}

export const useWatchFetch = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const service = useMemo(() => new WatchApiService(), [])

  const fetchWatches = async (): Promise<FetchResult> => {
    const result = await service.getWatches('all', setIsLoading)
    if (result.data) {
      dispatch(setWatchList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const createWatch = async (payload: CreateWatchPayload): Promise<OperationResult> => {
    const result = await service.createWatch(payload, setIsLoading)

    if (result.data) {
      dispatch(addWatch(result.data))
    }

    return {
      success: result.status === 200 || result.status === 201,
      message: result.message,
      data: result.data,
    }
  }

  const updateWatch = async (id: number, payload: UpdateWatchPayload): Promise<OperationResult> => {
    const result = await service.updateWatch(id, payload, setIsLoading)

    if (result.data) {
      dispatch(updateWatchInList(result.data))
    }

    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const deleteWatch = async (id: number): Promise<OperationResult> => {
    const result = await service.deleteWatch(id, setIsLoading)

    if (result.status === 200) {
      dispatch(removeWatch(id))
    }

    return {
      success: result.status === 200,
      message: result.message,
    }
  }

  const configureWatch = async (payload: ConfigureWatchPayload): Promise<OperationResult> => {
    const result = await service.configureWatch(payload, setIsLoading)

    if (result.data) {
      dispatch(updateWatchInList(result.data))
    }

    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  return {
    isLoading,
    fetchWatches,
    createWatch,
    updateWatch,
    deleteWatch,
    configureWatch,
  }
}
