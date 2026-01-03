import {
  EventApiResponse,
  EventModel,
  CommentApiResponse,
  CommentModel,
  ImageApiResponse,
  ImageModel,
  EventCarApiResponse,
  EventCarModel,
  EventModemApiResponse,
  EventModemModel,
  EventSimApiResponse,
  EventSimModel,
  EventPlatformApiResponse,
  EventPlatformModel,
  EventWatchApiResponse,
  EventWatchModel,
  PaginatedApiResponse,
  PaginationModel,
} from '../models/EventFeedModel'

export const adaptImageResponseToModel = (data: ImageApiResponse): ImageModel => ({
  id: data.id,
  table: data.table,
  tableId: data.table_id,
  url: data.url,
  createdAt: data.created_at,
})

export const adaptCommentResponseToModel = (data: CommentApiResponse): CommentModel => ({
  id: data.id,
  comment: data.comment,
  userId: data.user_id,
  eventId: data.event_id,
  parentId: data.parent_id,
  createdAt: data.created_at,
  user: data.user,
  replies: data.replies?.map(adaptCommentResponseToModel) || [],
})

export const adaptCarResponseToModel = (data: EventCarApiResponse | null): EventCarModel | null => {
  if (!data) return null
  return {
    id: data.id,
    name: data.name,
    mark: data.mark,
    model: data.model,
    placa: data.placa,
    modemId: data.modem_id,
    platformId: data.platform_id,
    dateEnd: data.date_end,
  }
}

export const adaptModemResponseToModel = (data: EventModemApiResponse | null): EventModemModel | null => {
  if (!data) return null
  return {
    id: data.id,
    code: data.code,
    imei: data.imei,
    active: data.active,
    isSale: data.is_sale,
    simId: data.sim_id,
    markId: data.mark_id,
    platformId: data.platform_id,
  }
}

export const adaptSimResponseToModel = (data: EventSimApiResponse | null): EventSimModel | null => {
  if (!data) return null
  return {
    id: data.id,
    number: data.number,
    imei: data.imei,
    active: data.active,
  }
}

export const adaptPlatformResponseToModel = (data: EventPlatformApiResponse | null): EventPlatformModel | null => {
  if (!data) return null
  return {
    id: data.id,
    name: data.name,
    url: data.url,
    email: data.email,
    active: data.active,
  }
}

export const adaptWatchResponseToModel = (data: EventWatchApiResponse | null): EventWatchModel | null => {
  if (!data) return null
  return {
    id: data.id,
    code: data.code,
    imei: data.imei,
    deviceName: data.device_name,
    platformId: data.platform_id,
  }
}

export const adaptEventResponseToModel = (data: EventApiResponse): EventModel => ({
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
  user: data.user,
  car: adaptCarResponseToModel(data.car),
  modem: adaptModemResponseToModel(data.modem),
  sim: adaptSimResponseToModel(data.sim),
  watch: adaptWatchResponseToModel(data.watch),
  platform: adaptPlatformResponseToModel(data.platform),
  images: data.images?.map(adaptImageResponseToModel) || [],
  comments: data.comments?.map(adaptCommentResponseToModel) || [],
})

export const adaptEventListResponseToModel = (data: EventApiResponse[]): EventModel[] =>
  data.map(adaptEventResponseToModel)

export const adaptPaginationResponseToModel = <T>(data: PaginatedApiResponse<T>): PaginationModel => ({
  currentPage: data.current_page,
  lastPage: data.last_page,
  perPage: data.per_page,
  total: data.total,
  from: data.from,
  to: data.to,
  nextPageUrl: data.next_page_url,
  prevPageUrl: data.prev_page_url,
})
