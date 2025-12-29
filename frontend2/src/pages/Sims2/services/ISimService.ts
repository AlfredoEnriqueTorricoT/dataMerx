import { ApiResponse, SetStateFn } from '../../../shared/types'
import {
  SimModel,
  SimDetailsModel,
  CreateSimPayload,
  UpdateSimPayload,
  ChangeStatusPayload,
  SimEventModel,
} from '../models/SimModel'

export interface ISimService {
  // CRUD Sims
  getSims(setLoading?: SetStateFn): Promise<ApiResponse<SimModel[]>>
  getSimById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>>
  getSimByImei(imei: string, setLoading?: SetStateFn): Promise<ApiResponse<SimModel[]>>
  createSim(payload: FormData, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>>
  updateSim(payload: UpdateSimPayload, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>>
  deleteSim(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>>

  // Detalles
  getSimDetails(id: number, setLoading?: SetStateFn): Promise<ApiResponse<SimDetailsModel>>

  // Operaciones especiales
  changeStatus(payload: ChangeStatusPayload, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>>
  uploadImages(simId: number, formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<SimModel>>

  // Eventos
  getSimEvents(simId: number, setLoading?: SetStateFn): Promise<ApiResponse<SimEventModel[]>>
  createSimEvent(formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<any>>
}
