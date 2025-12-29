import { ApiResponse, SetStateFn } from '../../../shared/types'
import {
  ModemModel,
  ModemMarkModel,
  PlatformModel,
  SimModel,
  CreateModemPayload,
  UpdateModemPayload,
  AssignSimPayload,
  TransferPayload,
  ChangeStatusPayload,
  ModemEventModel,
} from '../models/ModemModel'

export interface IModemService {
  // CRUD Modems
  getModems(setLoading?: SetStateFn): Promise<ApiResponse<ModemModel[]>>
  getModemById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>>
  createModem(payload: CreateModemPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>>
  updateModem(id: number, payload: UpdateModemPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>>
  deleteModem(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>>

  // Datos relacionados
  getModemMarks(setLoading?: SetStateFn): Promise<ApiResponse<ModemMarkModel[]>>
  getPlatforms(setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel[]>>
  getSims(setLoading?: SetStateFn): Promise<ApiResponse<SimModel[]>>

  // Operaciones especiales
  assignSim(payload: AssignSimPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>>
  transferModem(payload: TransferPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>>
  cancelTransfer(modemId: number, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>>
  changeStatus(payload: ChangeStatusPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>>
  uploadImages(modemId: number, images: FormData, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>>

  // Eventos
  getModemEvents(modemId: number, setLoading?: SetStateFn): Promise<ApiResponse<ModemEventModel[]>>
  createModemEvent(modemId: number, payload: { event_type: string; description: string }, setLoading?: SetStateFn): Promise<ApiResponse<ModemEventModel>>
}
