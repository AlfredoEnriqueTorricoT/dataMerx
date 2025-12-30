import { httpRequestWithAuth, transformApiData } from '../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../shared/types'
import { IModemService } from './IModemService'
import {
  ModemModel,
  ModemApiResponse,
  ModemMarkModel,
  ModemMarkApiResponse,
  PlatformModel,
  PlatformApiResponse,
  SimModel,
  SimApiResponse,
  CreateModemPayload,
  UpdateModemPayload,
  AssignSimPayload,
  TransferPayload,
  ChangeStatusPayload,
  ModemEventModel,
  ModemEventApiResponse,
} from '../models/ModemModel'
import {
  adaptModemResponseToModel,
  adaptModemListResponseToModel,
  adaptModemMarkListResponseToModel,
  adaptPlatformListResponseToModel,
  adaptSimListResponseToModel,
  adaptModemEventResponseToModel,
  adaptModemEventListResponseToModel,
} from '../adapters/modemAdapter'

type ApiListResponse<T> = { status: number; message: string; data: T[] }
type ApiSingleResponse<T> = { status: number; message: string; data: T }

export class ModemApiService implements IModemService {
  // CRUD Modems
  async getModems(setLoading?: SetStateFn): Promise<ApiResponse<ModemModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<ModemApiResponse>>('modem', setLoading)
    return transformApiData(res, (data) => adaptModemListResponseToModel(data.data || []))
  }

  async getModemById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>> {
    const res = await httpRequestWithAuth.get<ApiSingleResponse<ModemApiResponse>>(`modem/${id}`, setLoading)
    return transformApiData(res, (data) => adaptModemResponseToModel(data.data))
  }

  async searchByImei(imei: string, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<ModemApiResponse>>(
      `modem/${encodeURIComponent(imei)}`,
      setLoading
    )
    return transformApiData(res, (data) => adaptModemListResponseToModel(data.data || []))
  }

  async createModem(payload: CreateModemPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>> {
    const res = await httpRequestWithAuth.post<ApiSingleResponse<ModemApiResponse>>('modem', payload, setLoading)
    return transformApiData(res, (data) => adaptModemResponseToModel(data.data))
  }

  async updateModem(payload: UpdateModemPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>> {
    const res = await httpRequestWithAuth.put<ApiSingleResponse<ModemApiResponse>>('modem', payload, setLoading)
    return transformApiData(res, (data) => adaptModemResponseToModel(data.data))
  }

  async deleteModem(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.delete<void>(`modem/${id}`, setLoading)
  }

  // Datos relacionados
  async getModemMarks(setLoading?: SetStateFn): Promise<ApiResponse<ModemMarkModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<ModemMarkApiResponse>>('modem-mark', setLoading)
    return transformApiData(res, (data) => adaptModemMarkListResponseToModel(data.data || []))
  }

  async getPlatforms(setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<PlatformApiResponse>>('platform', setLoading)
    return transformApiData(res, (data) => adaptPlatformListResponseToModel(data.data || []))
  }

  async getSims(setLoading?: SetStateFn): Promise<ApiResponse<SimModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<SimApiResponse>>('sim', setLoading)
    return transformApiData(res, (data) => adaptSimListResponseToModel(data.data || []))
  }

  // Operaciones especiales
  async assignSim(payload: AssignSimPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>> {
    const res = await httpRequestWithAuth.put<ApiSingleResponse<ModemApiResponse>>('modem/update-sim', payload, setLoading)
    return transformApiData(res, (data) => adaptModemResponseToModel(data.data))
  }

  async removeSim(modemId: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.get<void>(`modem/remove-sim/${modemId}`, setLoading)
  }

  // Usuarios - para modales de transferencia y filtro
  async getUsers(setLoading?: SetStateFn): Promise<ApiResponse<any[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<any>>('user', setLoading)
    return transformApiData(res, (data) => data.data || [])
  }

  async transferModem(payload: TransferPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>> {
    const res = await httpRequestWithAuth.post<ApiSingleResponse<ModemApiResponse>>('modem/transfer', payload, setLoading)
    return transformApiData(res, (data) => adaptModemResponseToModel(data.data))
  }

  async cancelTransfer(modemId: number, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>> {
    const res = await httpRequestWithAuth.post<ApiSingleResponse<ModemApiResponse>>(`modem/cancel-transfer/${modemId}`, {}, setLoading)
    return transformApiData(res, (data) => adaptModemResponseToModel(data.data))
  }

  async changeStatus(payload: ChangeStatusPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>> {
    const res = await httpRequestWithAuth.post<ApiSingleResponse<ModemApiResponse>>('modem/change-status', payload, setLoading)
    return transformApiData(res, (data) => adaptModemResponseToModel(data.data))
  }

  async uploadImages(modemId: number, formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel>> {
    const res = await httpRequestWithAuth.postFormData<ApiSingleResponse<ModemApiResponse>>(`modem/${modemId}/images`, formData, setLoading)
    return transformApiData(res, (data) => adaptModemResponseToModel(data.data))
  }

  // Eventos
  async getModemEvents(modemId: number, setLoading?: SetStateFn): Promise<ApiResponse<ModemEventModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<ModemEventApiResponse>>(`event/modem/${modemId}`, setLoading)
    return transformApiData(res, (data) => adaptModemEventListResponseToModel(data.data || []))
  }

  async createModemEvent(
    formData: FormData,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<any>> {
    const res = await httpRequestWithAuth.postFormData<ApiSingleResponse<any>>('modem/event', formData, setLoading)
    return res
  }
}
