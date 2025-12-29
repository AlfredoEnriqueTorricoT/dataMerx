import { httpRequestWithAuth, transformApiData } from '../../../shared/utils/httpService'
import { ApiResponse, SetStateFn } from '../../../shared/types'
import { IModemBrandService } from './IModemBrandService'
import {
  ModemBrandModel,
  ModemBrandApiResponse,
  CreateModemBrandPayload,
  UpdateModemBrandPayload,
} from '../models/ModemBrandModel'
import {
  adaptModemBrandResponseToModel,
  adaptModemBrandListResponseToModel,
} from '../adapters/modemBrandAdapter'

type ApiListResponse<T> = { status: number; message: string; data: T[] }
type ApiSingleResponse<T> = { status: number; message: string; data: T }

export class ModemBrandApiService implements IModemBrandService {
  async getModemBrands(setLoading?: SetStateFn): Promise<ApiResponse<ModemBrandModel[]>> {
    const res = await httpRequestWithAuth.get<ApiListResponse<ModemBrandApiResponse>>('modem-mark', setLoading)
    return transformApiData(res, (data) => adaptModemBrandListResponseToModel(data.data || []))
  }

  async getModemBrandById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<ModemBrandModel>> {
    const res = await httpRequestWithAuth.get<ApiSingleResponse<ModemBrandApiResponse>>(`modem-mark/${id}`, setLoading)
    return transformApiData(res, (data) => adaptModemBrandResponseToModel(data.data))
  }

  async createModemBrand(payload: CreateModemBrandPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemBrandModel>> {
    const res = await httpRequestWithAuth.post<ApiSingleResponse<ModemBrandApiResponse>>('modem-mark', payload, setLoading)
    return transformApiData(res, (data) => adaptModemBrandResponseToModel(data.data))
  }

  async updateModemBrand(id: number, payload: UpdateModemBrandPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemBrandModel>> {
    const res = await httpRequestWithAuth.put<ApiSingleResponse<ModemBrandApiResponse>>(`modem-mark/${id}`, payload, setLoading)
    return transformApiData(res, (data) => adaptModemBrandResponseToModel(data.data))
  }

  async deleteModemBrand(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    return await httpRequestWithAuth.delete<void>(`modem-mark/${id}`, setLoading)
  }
}
