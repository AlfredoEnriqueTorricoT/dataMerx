import { httpRequestWithAuth, transformApiData } from '../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../shared/types'
import { ISimService } from './ISimService'
import {
  SimModel,
  SimApiResponse,
  SimDetailsModel,
  SimDetailsApiResponse,
  UpdateSimPayload,
  ChangeStatusPayload,
  SimEventModel,
  SimEventApiResponse,
} from '../models/SimModel'
import {
  adaptSimResponseToModel,
  adaptSimListResponseToModel,
  adaptSimDetailsResponseToModel,
  adaptSimEventListResponseToModel,
} from '../adapters/simAdapter'

type ApiListResponse<T> = { status: number; message: string; data: T[] }
type ApiSingleResponse<T> = { status: number; message: string; data: T }

export class SimApiService implements ISimService {
  // CRUD Sims
  async getSims(setLoading?: SetStateFn): Promise<ApiResponse<SimModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<SimApiResponse>>('sim', setLoading)
    return transformApiData(res, (data) => adaptSimListResponseToModel(data.data || []))
  }

  async getSimById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>> {
    const res = await httpRequestWithAuth.get<ApiSingleResponse<SimApiResponse>>(`sim/${id}`, setLoading)
    return transformApiData(res, (data) => adaptSimResponseToModel(data.data))
  }

  async getSimByImei(imei: string, setLoading?: SetStateFn): Promise<ApiResponse<SimModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<SimApiResponse>>(`sim?imei=${imei}`, setLoading)
    return transformApiData(res, (data) => adaptSimListResponseToModel(data.data || []))
  }

  async createSim(formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>> {
    const res = await httpRequestWithAuth.postFormData<ApiSingleResponse<SimApiResponse>>('sim-upload', formData, setLoading)
    return transformApiData(res, (data) => adaptSimResponseToModel(data.data))
  }

  async updateSim(payload: UpdateSimPayload, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>> {
    const res = await httpRequestWithAuth.put<ApiSingleResponse<SimApiResponse>>('sim', payload, setLoading)
    return transformApiData(res, (data) => adaptSimResponseToModel(data.data))
  }

  async deleteSim(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.delete<void>(`sim/${id}`, setLoading)
  }

  // Detalles
  async getSimDetails(id: number, setLoading?: SetStateFn): Promise<ApiResponse<SimDetailsModel>> {
    const res = await httpRequestWithAuth.get<ApiSingleResponse<SimDetailsApiResponse>>(`sim/details/${id}`, setLoading)
    return transformApiData(res, (data) => adaptSimDetailsResponseToModel(data.data))
  }

  // Operaciones especiales
  async changeStatus(payload: ChangeStatusPayload, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>> {
    const res = await httpRequestWithAuth.post<ApiSingleResponse<SimApiResponse>>('sim/change-status', payload, setLoading)
    return transformApiData(res, (data) => adaptSimResponseToModel(data.data))
  }

  async uploadImages(simId: number, formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>> {
    const res = await httpRequestWithAuth.postFormData<ApiSingleResponse<SimApiResponse>>(`sim/${simId}/images`, formData, setLoading)
    return transformApiData(res, (data) => adaptSimResponseToModel(data.data))
  }

  // Eventos
  async getSimEvents(simId: number, setLoading?: SetStateFn): Promise<ApiResponse<SimEventModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<SimEventApiResponse>>(`event/sim/${simId}`, setLoading)
    return transformApiData(res, (data) => adaptSimEventListResponseToModel(data.data || []))
  }

  async createSimEvent(formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<any>> {
    const res = await httpRequestWithAuth.postFormData<ApiSingleResponse<any>>('sim/event', formData, setLoading)
    return res
  }
}
