import {
  ModemApiResponse,
  ModemModel,
  SimApiResponse,
  SimModel,
  ModemMarkApiResponse,
  ModemMarkModel,
  PlatformApiResponse,
  PlatformModel,
  ModemEventApiResponse,
  ModemEventModel,
} from '../models/ModemModel'

export const adaptSimResponseToModel = (data: SimApiResponse | null): SimModel | null => {
  if (!data) return null
  return {
    id: data.id,
    number: data.number,
    imei: data.imei,
    code: data.code,
    active: data.active,
    dischargeDate: data.discharge_date,
    installationDate: data.installation_date,
  }
}

export const adaptModemMarkResponseToModel = (data: ModemMarkApiResponse | null): ModemMarkModel | null => {
  if (!data) return null
  return {
    id: data.id,
    name: data.name,
    detail: data.detail,
  }
}

export const adaptPlatformResponseToModel = (data: PlatformApiResponse | null): PlatformModel | null => {
  if (!data) return null
  return {
    id: data.id,
    name: data.name,
    detail: data.detail,
    url: data.url,
    email: data.email,
    active: data.active,
    credencial: data.credencial,
  }
}

export const adaptModemResponseToModel = (data: ModemApiResponse): ModemModel => {
  // Usar campos aplanados si están disponibles, sino usar objetos anidados
  const modemsMark = data.modems_mark
    ? adaptModemMarkResponseToModel(data.modems_mark)
    : data.mark_modem_name
    ? { id: data.mark_id, name: data.mark_modem_name, detail: '' }
    : null

  const platform = data.platform
    ? adaptPlatformResponseToModel(data.platform)
    : data.platform_name && data.platform_id
    ? { id: data.platform_id, name: data.platform_name, detail: null, url: '', email: '', active: 1, credencial: '' }
    : null

  const sim = data.sim
    ? adaptSimResponseToModel(data.sim)
    : data.sim_number && data.sim_id
    ? { id: data.sim_id, number: data.sim_number, imei: '', code: '', active: 1, dischargeDate: null, installationDate: null }
    : null

  return {
    id: data.id,
    code: data.code,
    imei: data.imei,
    active: data.active,
    isSale: data.is_sale,
    simId: data.sim_id,
    markId: data.mark_id,
    platformId: data.platform_id,
    responsabilityHistoryId: data.responsability_history_id,
    userResponsabilityId: data.user_responsability_id,
    userSuccessorId: data.user_successor_id,
    isPending: data.is_pending,
    images: data.images || [],
    sim,
    modemsMark,
    platform,
    responsability: data.responsability,
    successor: data.successor,
  }
}

export const adaptModemListResponseToModel = (data: ModemApiResponse[]): ModemModel[] =>
  data.map(adaptModemResponseToModel)

export const adaptModemMarkListResponseToModel = (data: ModemMarkApiResponse[]): ModemMarkModel[] =>
  data.map((item) => adaptModemMarkResponseToModel(item)!)

export const adaptPlatformListResponseToModel = (data: PlatformApiResponse[]): PlatformModel[] =>
  data.map((item) => adaptPlatformResponseToModel(item)!)

export const adaptSimListResponseToModel = (data: SimApiResponse[]): SimModel[] =>
  data.map((item) => adaptSimResponseToModel(item)!)

export const adaptModemEventResponseToModel = (data: ModemEventApiResponse): ModemEventModel => ({
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

export const adaptModemEventListResponseToModel = (data: ModemEventApiResponse[]): ModemEventModel[] =>
  data.map(adaptModemEventResponseToModel)
