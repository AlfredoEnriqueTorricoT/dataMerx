import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SimApiService } from '../services/SimApiService'
import {
  SimModel,
  SimDetailsModel,
  UpdateSimPayload,
  ChangeStatusPayload,
  SimEventModel,
} from '../models/SimModel'
import {
  setSimList,
  addSim,
  updateSimInList,
  removeSim,
  setSimDetails,
  setEventList,
  setIsLoaded,
} from '../slices/simSlice'

interface FetchResult<T> {
  success: boolean
  message: string
  data?: T
}

interface RootState {
  Sims2: {
    isLoaded: boolean
  }
}

export const useSimFetch = () => {
  const { isLoaded } = useSelector((state: RootState) => state.Sims2)
  const [isLoading, setIsLoading] = useState(!isLoaded)
  const [isOperating, setIsOperating] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new SimApiService(), [])

  // Fetch inicial de todos los datos
  const fetchAllData = async (): Promise<FetchResult<void>> => {
    setIsLoading(true)
    try {
      const simsRes = await service.getSims()

      if (simsRes.data) dispatch(setSimList(simsRes.data))

      dispatch(setIsLoaded(true))
      setIsLoading(false)
      return { success: simsRes.status === 200, message: simsRes.message }
    } catch (error) {
      setIsLoading(false)
      return { success: false, message: 'Error al cargar datos' }
    }
  }

  // CRUD Sims
  const fetchSims = async (): Promise<FetchResult<SimModel[]>> => {
    const result = await service.getSims(setIsLoading)
    if (result.data) {
      dispatch(setSimList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const searchSimByImei = async (imei: string): Promise<FetchResult<SimModel[]>> => {
    const result = await service.getSimByImei(imei, setIsLoading)
    if (result.data) {
      dispatch(setSimList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const createSim = async (formData: FormData): Promise<FetchResult<SimModel>> => {
    const result = await service.createSim(formData, setIsOperating)
    if (result.data) {
      dispatch(addSim(result.data))
    }
    return {
      success: result.status === 200 || result.status === 201,
      message: result.message,
      data: result.data,
    }
  }

  const updateSim = async (payload: UpdateSimPayload): Promise<FetchResult<SimModel>> => {
    const result = await service.updateSim(payload, setIsOperating)
    if (result.data) {
      dispatch(updateSimInList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const deleteSim = async (id: number): Promise<FetchResult<void>> => {
    const result = await service.deleteSim(id, setIsOperating)
    if (result.status === 200) {
      dispatch(removeSim(id))
    }
    return {
      success: result.status === 200,
      message: result.message,
    }
  }

  // Detalles
  const fetchSimDetails = async (id: number): Promise<FetchResult<SimDetailsModel>> => {
    const result = await service.getSimDetails(id, setIsOperating)
    if (result.data) {
      dispatch(setSimDetails(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  // Operaciones especiales
  const changeStatus = async (payload: ChangeStatusPayload): Promise<FetchResult<SimModel>> => {
    const result = await service.changeStatus(payload, setIsOperating)
    if (result.data) {
      dispatch(updateSimInList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const uploadImages = async (simId: number, formData: FormData): Promise<FetchResult<SimModel>> => {
    const result = await service.uploadImages(simId, formData, setIsOperating)
    if (result.data) {
      dispatch(updateSimInList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  // Eventos
  const fetchSimEvents = async (simId: number): Promise<FetchResult<SimEventModel[]>> => {
    const result = await service.getSimEvents(simId, setIsOperating)
    if (result.data) {
      dispatch(setEventList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const createSimEvent = async (formData: FormData): Promise<FetchResult<any>> => {
    const result = await service.createSimEvent(formData, setIsOperating)
    return {
      success: result.status === 200 || result.status === 201,
      message: result.message,
      data: result.data,
    }
  }

  return {
    isLoading,
    isOperating,
    fetchAllData,
    fetchSims,
    searchSimByImei,
    createSim,
    updateSim,
    deleteSim,
    fetchSimDetails,
    changeStatus,
    uploadImages,
    fetchSimEvents,
    createSimEvent,
  }
}
