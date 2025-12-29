import { useDispatch } from 'react-redux'
import { usePlatform } from './usePlatform'
import { PlatformApiService } from '../services/PlatformApiService'
import {
  setPlatformList,
  addPlatformToList,
  updatePlatformInList,
  removePlatformFromList,
  setWifiList,
  addWifiToList,
  removeWifiFromList,
  setIsLoading,
  setIsOperating,
} from '../slices/platformSlice'
import {
  CreatePlatformPayload,
  UpdatePlatformPayload,
  CreateWifiPayload,
} from '../models/PlatformModel'

export const usePlatformFetch = () => {
  const dispatch = useDispatch()
  const { isLoading, isOperating } = usePlatform()
  const service = new PlatformApiService()

  const fetchPlatforms = async () => {
    dispatch(setIsLoading(true))
    const response = await service.getPlatforms()
    dispatch(setIsLoading(false))

    if (response.status === 200 && response.data) {
      dispatch(setPlatformList(response.data))
      return { success: true, data: response.data }
    }
    return { success: false, data: null }
  }

  const createPlatform = async (payload: CreatePlatformPayload) => {
    dispatch(setIsOperating(true))
    const response = await service.createPlatform(payload)
    dispatch(setIsOperating(false))

    if (response.status === 200 && response.data) {
      dispatch(addPlatformToList(response.data))
      return { success: true, data: response.data }
    }
    return { success: false, data: null }
  }

  const updatePlatform = async (id: number, payload: UpdatePlatformPayload) => {
    dispatch(setIsOperating(true))
    const response = await service.updatePlatform(id, payload)
    dispatch(setIsOperating(false))

    if (response.status === 200 && response.data) {
      dispatch(updatePlatformInList(response.data))
      return { success: true, data: response.data }
    }
    return { success: false, data: null }
  }

  const deletePlatform = async (id: number) => {
    dispatch(setIsOperating(true))
    const response = await service.deletePlatform(id)
    dispatch(setIsOperating(false))

    if (response.status === 200) {
      dispatch(removePlatformFromList(id))
      return { success: true }
    }
    return { success: false }
  }

  // Wifi operations
  const fetchWifis = async (platformId: number) => {
    dispatch(setIsLoading(true))
    const response = await service.getWifis(platformId)
    dispatch(setIsLoading(false))

    if (response.status === 200 && response.data) {
      dispatch(setWifiList(response.data))
      return { success: true, data: response.data }
    }
    return { success: false, data: null }
  }

  const createWifi = async (payload: CreateWifiPayload) => {
    dispatch(setIsOperating(true))
    const response = await service.createWifi(payload)
    dispatch(setIsOperating(false))

    if (response.status === 200 && response.data) {
      dispatch(addWifiToList(response.data))
      return { success: true, data: response.data }
    }
    return { success: false, data: null }
  }

  const deleteWifi = async (id: number) => {
    dispatch(setIsOperating(true))
    const response = await service.deleteWifi(id)
    dispatch(setIsOperating(false))

    if (response.status === 200) {
      dispatch(removeWifiFromList(id))
      return { success: true }
    }
    return { success: false }
  }

  return {
    isLoading,
    isOperating,
    fetchPlatforms,
    createPlatform,
    updatePlatform,
    deletePlatform,
    fetchWifis,
    createWifi,
    deleteWifi,
  }
}
