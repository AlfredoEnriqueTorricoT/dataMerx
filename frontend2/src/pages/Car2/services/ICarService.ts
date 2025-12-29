import { ApiResponse, SetStateFn } from 'shared/types'
import {
  CarModel,
  CarDetailsModel,
  CarEventModel,
  ModemModel,
  CreateCarPayload,
  UpdateCarPayload,
  AssignModemPayload,
  PlatformModel,
} from '../models/CarModel'

export interface ICarService {
  // Car CRUD
  getCars(setLoading?: SetStateFn): Promise<ApiResponse<CarModel[]>>
  getCarById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<CarModel>>
  createCar(formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<CarModel>>
  updateCar(payload: UpdateCarPayload, setLoading?: SetStateFn): Promise<ApiResponse<CarModel>>

  // Car details
  getCarDetails(id: number, setLoading?: SetStateFn): Promise<ApiResponse<CarDetailsModel>>

  // Modem operations
  searchModemsByImei(imei: string, setLoading?: SetStateFn): Promise<ApiResponse<ModemModel[]>>
  assignModem(payload: AssignModemPayload, setLoading?: SetStateFn): Promise<ApiResponse<any>>
  removeModem(modemId: number, setLoading?: SetStateFn): Promise<ApiResponse<any>>

  // Events
  getCarEvents(carId: number, setLoading?: SetStateFn): Promise<ApiResponse<CarEventModel[]>>
  createCarEvent(formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<CarEventModel>>

  // Images
  uploadImages(carId: number, formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<any>>

  // Platform
  getPlatforms(setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel[]>>
}
