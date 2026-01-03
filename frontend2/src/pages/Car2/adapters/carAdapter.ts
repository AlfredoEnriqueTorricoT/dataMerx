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
} from '../models/CarModel'

export const adaptCarResponseToModel = (data: CarApiResponse): CarModel => {
  return {
    id: data.id,
    name: data.name,
    mark: data.mark,
    model: data.model,
    placa: data.placa,
    platformId: data.platform_id,
    platformName: data.platform?.name || null,
    modemId: data.modem_id,
    watchId: data.watch_id,
    active: data.active,
    images: data.images || [],
  }
}

export const adaptCarListResponseToModel = (data: CarApiResponse[]): CarModel[] => {
  return data.map(adaptCarResponseToModel)
}

export const adaptCarDetailsResponseToModel = (data: CarDetailsApiResponse): CarDetailsModel => {
  return {
    car: {
      id: data.car.id,
      name: data.car.name,
      mark: data.car.mark,
      model: data.car.model,
      placa: data.car.placa,
      platformId: data.car.platform_id,
      platformName: data.car.platform?.name || null,
      modemId: data.car.modem_id,
      images: data.car.images || [],
    },
    modem: data.modem
      ? {
          id: data.modem.id,
          code: data.modem.code,
          imei: data.modem.imei,
          markId: data.modem.mark_id,
          markName: data.modem.modems_mark?.name || null,
          active: data.modem.active,
        }
      : null,
    watch: data.watch
      ? {
          id: data.watch.id,
          code: data.watch.code,
          imei: data.watch.imei,
          deviceName: data.watch.device_name,
        }
      : null,
    sim: data.sim,
  }
}

export const adaptCarEventResponseToModel = (data: CarEventApiResponse): CarEventModel => {
  return {
    id: data.id,
    title: data.title,
    detail: data.detail,
    typeId: data.type_id,
    carId: data.car_id,
    watchId: data.watch_id,
    watchImei: data.watch?.imei || null,
    modemId: data.modem_id,
    modemImei: data.modem?.imei || null,
    createdAt: data.created_at,
    images: data.images || [],
  }
}

export const adaptCarEventListResponseToModel = (data: CarEventApiResponse[]): CarEventModel[] => {
  return data.map(adaptCarEventResponseToModel)
}

export const adaptModemResponseToModel = (data: ModemApiResponse): ModemModel => {
  return {
    id: data.id,
    code: data.code,
    imei: data.imei,
    markId: data.mark_id,
    active: data.active,
    modemsMarkName: data.modems_mark?.name || null,
  }
}

export const adaptModemListResponseToModel = (data: ModemApiResponse[]): ModemModel[] => {
  return data.map(adaptModemResponseToModel)
}

export const adaptWatchResponseToModel = (data: WatchApiResponse): WatchModel => {
  return {
    id: data.id,
    code: data.code,
    imei: data.imei,
    deviceName: data.device_name,
    platformId: data.platform_id,
    platformName: data.platform_name || null,
  }
}

export const adaptWatchListResponseToModel = (data: WatchApiResponse[]): WatchModel[] => {
  return data.map(adaptWatchResponseToModel)
}
