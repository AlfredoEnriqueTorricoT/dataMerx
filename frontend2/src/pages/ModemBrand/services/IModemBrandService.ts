import { ApiResponse, SetStateFn } from '../../../shared/types'
import {
  ModemBrandModel,
  CreateModemBrandPayload,
  UpdateModemBrandPayload,
} from '../models/ModemBrandModel'

export interface IModemBrandService {
  getModemBrands(setLoading?: SetStateFn): Promise<ApiResponse<ModemBrandModel[]>>
  getModemBrandById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<ModemBrandModel>>
  createModemBrand(payload: CreateModemBrandPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemBrandModel>>
  updateModemBrand(id: number, payload: UpdateModemBrandPayload, setLoading?: SetStateFn): Promise<ApiResponse<ModemBrandModel>>
  deleteModemBrand(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>>
}
