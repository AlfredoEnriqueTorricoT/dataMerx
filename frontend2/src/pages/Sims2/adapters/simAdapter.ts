import {
  SimApiResponse,
  SimModel,
  SimDetailsApiResponse,
  SimDetailsModel,
  CarApiResponse,
  CarModel,
  ModemApiResponse,
  ModemModel,
  SimEventApiResponse,
  SimEventModel,
} from '../models/SimModel'

export const adaptSimResponseToModel = (data: SimApiResponse): SimModel => {
  return {
    id: data.id,
    number: data.number,
    imei: data.imei,
    code: data.code,
    active: data.active,
    dischargeDate: data.discharge_date,
    installationDate: data.installation_date,
    images: data.images || [],
  }
}

export const adaptSimListResponseToModel = (data: SimApiResponse[]): SimModel[] =>
  data.map(adaptSimResponseToModel)

export const adaptCarResponseToModel = (data: CarApiResponse | null): CarModel | null => {
  if (!data) return null
  return {
    id: data.id,
    name: data.name,
    placa: data.placa,
    mark: data.mark,
    model: data.model,
    platform: data.platform,
  }
}

export const adaptModemResponseToModel = (data: ModemApiResponse | null): ModemModel | null => {
  if (!data) return null
  return {
    id: data.id,
    code: data.code,
    imei: data.imei,
    active: data.active,
    modemsMark: data.modems_mark,
  }
}

export const adaptSimDetailsResponseToModel = (data: SimDetailsApiResponse): SimDetailsModel => {
  return {
    sim: adaptSimResponseToModel(data.sim),
    car: adaptCarResponseToModel(data.car),
    modem: adaptModemResponseToModel(data.modem),
  }
}

export const adaptSimEventResponseToModel = (data: SimEventApiResponse): SimEventModel => ({
  id: data.id,
  title: data.title,
  detail: data.detail,
  typeId: data.type_id,
  carId: data.car_id,
  modemId: data.modem_id,
  simId: data.sim_id,
  platformId: data.platform_id,
  watchId: data.watch_id,
  userId: data.user_id,
  createdAt: data.created_at,
  car: data.car,
  modem: data.modem,
  sim: data.sim,
  platform: data.platform,
  images: data.images,
})

export const adaptSimEventListResponseToModel = (data: SimEventApiResponse[]): SimEventModel[] =>
  data.map(adaptSimEventResponseToModel)
