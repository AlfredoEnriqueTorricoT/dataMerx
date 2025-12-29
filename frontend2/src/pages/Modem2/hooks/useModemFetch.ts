import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModemApiService } from '../services/ModemApiService'
import {
  ModemModel,
  ModemMarkModel,
  PlatformModel,
  CreateModemPayload,
  UpdateModemPayload,
  AssignSimPayload,
  TransferPayload,
  ChangeStatusPayload,
  ModemEventModel,
} from '../models/ModemModel'
import {
  setModemList,
  addModem,
  updateModemInList,
  removeModem,
  setModemMarkList,
  setPlatformList,
  setSimList,
  setEventList,
  addEvent,
  setIsLoaded,
} from '../slices/modemSlice'

interface FetchResult<T> {
  success: boolean
  message: string
  data?: T
}

interface RootState {
  Modem2: {
    isLoaded: boolean
    modemMarkList: ModemMarkModel[]
    platformList: PlatformModel[]
  }
}

export const useModemFetch = () => {
  const { isLoaded, modemMarkList, platformList } = useSelector((state: RootState) => state.Modem2)
  const [isLoading, setIsLoading] = useState(!isLoaded)
  const [isOperating, setIsOperating] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new ModemApiService(), [])

  // Fetch inicial de todos los datos
  const fetchAllData = async (): Promise<FetchResult<void>> => {
    setIsLoading(true)
    try {
      const [modemsRes, marksRes, platformsRes, simsRes] = await Promise.all([
        service.getModems(),
        service.getModemMarks(),
        service.getPlatforms(),
        service.getSims(),
      ])

      if (modemsRes.data) dispatch(setModemList(modemsRes.data))
      if (marksRes.data) dispatch(setModemMarkList(marksRes.data))
      if (platformsRes.data) dispatch(setPlatformList(platformsRes.data))
      if (simsRes.data) dispatch(setSimList(simsRes.data))

      dispatch(setIsLoaded(true))
      setIsLoading(false)
      return { success: modemsRes.status === 200, message: modemsRes.message }
    } catch (error) {
      setIsLoading(false)
      return { success: false, message: 'Error al cargar datos' }
    }
  }

  // CRUD Modems
  const fetchModems = async (): Promise<FetchResult<ModemModel[]>> => {
    const result = await service.getModems(setIsLoading)
    if (result.data) {
      dispatch(setModemList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const createModem = async (payload: CreateModemPayload): Promise<FetchResult<ModemModel>> => {
    const result = await service.createModem(payload, setIsOperating)
    if (result.data) {
      // Enriquecer el modem con la marca y plataforma desde las listas del store
      const enrichedModem: ModemModel = {
        ...result.data,
        modemsMark: result.data.modemsMark || modemMarkList.find((m) => m.id === result.data!.markId) || null,
        platform: result.data.platform || platformList.find((p) => p.id === result.data!.platformId) || null,
      }
      dispatch(addModem(enrichedModem))
    }
    return {
      success: result.status === 200 || result.status === 201,
      message: result.message,
      data: result.data,
    }
  }

  const updateModem = async (payload: UpdateModemPayload): Promise<FetchResult<ModemModel>> => {
    const result = await service.updateModem(payload, setIsOperating)
    if (result.data) {
      // Enriquecer el modem con la marca y plataforma desde las listas del store
      const enrichedModem: ModemModel = {
        ...result.data,
        modemsMark: result.data.modemsMark || modemMarkList.find((m) => m.id === result.data!.markId) || null,
        platform: result.data.platform || platformList.find((p) => p.id === result.data!.platformId) || null,
      }
      dispatch(updateModemInList(enrichedModem))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const deleteModem = async (id: number): Promise<FetchResult<void>> => {
    const result = await service.deleteModem(id, setIsOperating)
    if (result.status === 200) {
      dispatch(removeModem(id))
    }
    return {
      success: result.status === 200,
      message: result.message,
    }
  }

  // Operaciones especiales
  const assignSim = async (payload: AssignSimPayload): Promise<FetchResult<ModemModel>> => {
    const result = await service.assignSim(payload, setIsOperating)
    if (result.data) {
      dispatch(updateModemInList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const transferModem = async (payload: TransferPayload): Promise<FetchResult<ModemModel>> => {
    const result = await service.transferModem(payload, setIsOperating)
    if (result.data) {
      dispatch(updateModemInList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const cancelTransfer = async (modemId: number): Promise<FetchResult<ModemModel>> => {
    const result = await service.cancelTransfer(modemId, setIsOperating)
    if (result.data) {
      dispatch(updateModemInList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const changeStatus = async (payload: ChangeStatusPayload): Promise<FetchResult<ModemModel>> => {
    const result = await service.changeStatus(payload, setIsOperating)
    if (result.data) {
      dispatch(updateModemInList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const uploadImages = async (modemId: number, formData: FormData): Promise<FetchResult<ModemModel>> => {
    const result = await service.uploadImages(modemId, formData, setIsOperating)
    if (result.data) {
      dispatch(updateModemInList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  // Eventos
  const fetchModemEvents = async (modemId: number): Promise<FetchResult<ModemEventModel[]>> => {
    const result = await service.getModemEvents(modemId, setIsOperating)
    if (result.data) {
      dispatch(setEventList(result.data))
    }
    return {
      success: result.status === 200,
      message: result.message,
      data: result.data,
    }
  }

  const createModemEvent = async (
    formData: FormData
  ): Promise<FetchResult<any>> => {
    const result = await service.createModemEvent(formData, setIsOperating)
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
    fetchModems,
    createModem,
    updateModem,
    deleteModem,
    assignSim,
    transferModem,
    cancelTransfer,
    changeStatus,
    uploadImages,
    fetchModemEvents,
    createModemEvent,
  }
}
