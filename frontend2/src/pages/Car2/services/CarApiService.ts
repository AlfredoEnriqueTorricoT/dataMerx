import { httpRequestWithAuth, transformApiData } from 'shared/utils/httpService'
import { ApiResponse, SetStateFn } from 'shared/types'
import { ICarService } from './ICarService'
import {
  CarModel,
  CarApiResponse,
  CarDetailsModel,
  CarDetailsApiResponse,
  CarEventModel,
  CarEventApiResponse,
  ModemModel,
  ModemApiResponse,
  WatchModel,
  WatchApiResponse,
  UpdateCarPayload,
  AssignModemPayload,
  AssignWatchPayload,
  PlatformModel,
} from '../models/CarModel'
import {
  adaptCarResponseToModel,
  adaptCarListResponseToModel,
  adaptCarDetailsResponseToModel,
  adaptCarEventListResponseToModel,
  adaptModemListResponseToModel,
  adaptWatchListResponseToModel,
} from '../adapters/carAdapter'

export class CarApiService implements ICarService {
  async getCars(setLoading?: SetStateFn): Promise<ApiResponse<CarModel[]>> {
    const res = await httpRequestWithAuth.get<{ data: CarApiResponse[] }>('car', setLoading)
    return transformApiData(res, (data) => adaptCarListResponseToModel(data.data || []))
  }

  async searchByPlaca(placa: string, setLoading?: SetStateFn): Promise<ApiResponse<CarModel[]>> {
    const res = await httpRequestWithAuth.get<{ data: CarApiResponse[] }>(
      `car/${encodeURIComponent(placa)}`,
      setLoading
    )
    return transformApiData(res, (data) => adaptCarListResponseToModel(data.data || []))
  }

  async getCarById(id: number, setLoading?: SetStateFn): Promise<ApiResponse<CarModel>> {
    const res = await httpRequestWithAuth.get<{ data: CarApiResponse }>(`car/${id}`, setLoading)
    return transformApiData(res, (data) => adaptCarResponseToModel(data.data))
  }

  async createCar(formData: FormData, setLoading?: SetStateFn): Promise<ApiResponse<CarModel>> {
    const res = await httpRequestWithAuth.postFormData<{ data: CarApiResponse }>(
      'car-upload',
      formData,
      setLoading
    )
    return transformApiData(res, (data) => adaptCarResponseToModel(data.data))
  }

  async updateCar(
    payload: UpdateCarPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<CarModel>> {
    const res = await httpRequestWithAuth.put<{ data: CarApiResponse }>('car', payload, setLoading)
    return transformApiData(res, (data) => adaptCarResponseToModel(data.data))
  }

  async getCarDetails(id: number, setLoading?: SetStateFn): Promise<ApiResponse<CarDetailsModel>> {
    const res = await httpRequestWithAuth.get<{ data: CarDetailsApiResponse }>(
      `car/details/${id}`,
      setLoading
    )
    return transformApiData(res, (data) => adaptCarDetailsResponseToModel(data.data))
  }

  async searchModemsByImei(
    imei: string,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<ModemModel[]>> {
    const res = await httpRequestWithAuth.get<{ data: ModemApiResponse[] }>(
      `modem/${imei}`,
      setLoading
    )
    return transformApiData(res, (data) => adaptModemListResponseToModel(data.data || []))
  }

  async assignModem(
    payload: AssignModemPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<any>> {
    const res = await httpRequestWithAuth.put<{ data: any }>(
      'car/update-modem',
      payload,
      setLoading
    )
    return res
  }

  async removeModem(modemId: number, setLoading?: SetStateFn): Promise<ApiResponse<any>> {
    const res = await httpRequestWithAuth.get<{ data: any }>(
      `car/remove-modem/${modemId}`,
      setLoading
    )
    return res
  }

  async getCarEvents(
    carId: number,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<CarEventModel[]>> {
    const res = await httpRequestWithAuth.get<{
      data: CarEventApiResponse[] | { data: CarEventApiResponse[] }
    }>(`event/car/${carId}`, setLoading)
    return transformApiData(res, (data) => {
      // Handle both paginated and non-paginated responses
      const events = Array.isArray(data.data) ? data.data : data.data?.data || []
      return adaptCarEventListResponseToModel(events)
    })
  }

  async createCarEvent(
    formData: FormData,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<CarEventModel>> {
    const res = await httpRequestWithAuth.postFormData<{ data: CarEventApiResponse }>(
      'car/event',
      formData,
      setLoading
    )
    return transformApiData(res, (data) => ({
      id: data.data.id,
      title: data.data.title,
      detail: data.data.detail,
      typeId: data.data.type_id,
      carId: data.data.car_id,
      createdAt: data.data.created_at,
      images: data.data.images || [],
    }))
  }

  async uploadImages(
    carId: number,
    formData: FormData,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<any>> {
    formData.append('id', carId.toString())
    const res = await httpRequestWithAuth.postFormData<{ data: any }>(
      'car/images',
      formData,
      setLoading
    )
    return res
  }

  async getPlatforms(setLoading?: SetStateFn): Promise<ApiResponse<PlatformModel[]>> {
    const res = await httpRequestWithAuth.get<{ data: PlatformModel[] }>('platform', setLoading)
    return transformApiData(res, (data) => data.data || [])
  }

  // Watch methods
  async searchWatchesByImei(
    imei: string,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<WatchModel[]>> {
    const res = await httpRequestWithAuth.get<{ data: WatchApiResponse[] }>(
      `watch/${imei}`,
      setLoading
    )
    return transformApiData(res, (data) => adaptWatchListResponseToModel(data.data || []))
  }

  async assignWatch(
    payload: AssignWatchPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<any>> {
    const res = await httpRequestWithAuth.put<{ data: any }>(
      'car/update-watch',
      payload,
      setLoading
    )
    return res
  }

  async removeWatch(carId: number, setLoading?: SetStateFn): Promise<ApiResponse<any>> {
    const res = await httpRequestWithAuth.get<{ data: any }>(
      `car/remove-watch/${carId}`,
      setLoading
    )
    return res
  }
}
