import { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { PlatformCountApiService } from '../services/PlatformCountApiService'
import { PlatformCountModel, CreatePlatformCountPayload } from '../models/PlatformCountModel'
import { setPlatformCountList, addPlatformCount, setModemImeiList } from '../slices/platformCountSlice'

interface FetchResult {
  success: boolean
  message: string
  data?: PlatformCountModel[]
}

interface OperationResult {
  success: boolean
  message: string
  data?: PlatformCountModel
}

interface ModemListResult {
  success: boolean
  message: string
  data?: string[]
}

export const usePlatformCountFetch = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const service = useMemo(() => new PlatformCountApiService(), [])

  const fetchPlatformCounts = async (): Promise<FetchResult> => {
    const result = await service.getPlatformCounts(setIsLoading)
    if (result.data) {
      dispatch(setPlatformCountList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const createPlatformCount = async (payload: CreatePlatformCountPayload): Promise<OperationResult> => {
    const result = await service.createPlatformCount(payload, setIsLoading)

    if (result.data) {
      dispatch(addPlatformCount(result.data))
    }

    return {
      success: result.status === 200 || result.status === 201,
      message: result.message,
      data: result.data,
    }
  }

  const fetchModemsByPlatform = async (platformId: number): Promise<ModemListResult> => {
    const result = await service.getModemsByPlatform(platformId, setIsLoading)
    if (result.data) {
      dispatch(setModemImeiList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  return {
    isLoading,
    fetchPlatformCounts,
    createPlatformCount,
    fetchModemsByPlatform,
  }
}
