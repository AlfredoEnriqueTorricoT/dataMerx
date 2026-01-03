/**
 * Modelos para el Feed de Eventos
 */

// Usuario
export interface UserModel {
  id: number
  name: string
  email: string
}

// Imagen
export interface ImageModel {
  id: number
  table: string
  tableId: number
  url: string
  createdAt: string
}

export interface ImageApiResponse {
  id: number
  table: string
  table_id: number
  url: string
  created_at: string
  updated_at: string
}

// Comentario con respuestas anidadas
export interface CommentModel {
  id: number
  comment: string
  userId: number
  eventId: number
  parentId: number | null
  createdAt: string
  user: UserModel | null
  replies: CommentModel[]
}

export interface CommentApiResponse {
  id: number
  comment: string
  user_id: number
  event_id: number
  parent_id: number | null
  created_at: string
  updated_at: string
  user: UserModel | null
  replies: CommentApiResponse[]
}

// Auto relacionado
export interface EventCarModel {
  id: number
  name: string | null
  mark: string
  model: string
  placa: string
  modemId: number | null
  platformId: number | null
  dateEnd: string | null
}

export interface EventCarApiResponse {
  id: number
  name: string | null
  mark: string
  model: string
  placa: string
  modem_id: number | null
  platform_id: number | null
  date_end: string | null
}

// Modem relacionado
export interface EventModemModel {
  id: number
  code: string
  imei: string
  active: number
  isSale: number
  simId: number | null
  markId: number | null
  platformId: number | null
}

export interface EventModemApiResponse {
  id: number
  code: string
  imei: string
  active: number
  is_sale: number
  sim_id: number | null
  mark_id: number | null
  platform_id: number | null
  responsability_history_id: number | null
  user_responsability_id: number | null
  user_successor_id: number | null
  is_pending: number
}

// SIM relacionado
export interface EventSimModel {
  id: number
  number: string
  imei: string
  active: number
}

export interface EventSimApiResponse {
  id: number
  number: string
  imei: string
  active: number
  discharge_date: string | null
  installation_date: string | null
}

// Plataforma relacionada
export interface EventPlatformModel {
  id: number
  name: string
  url: string
  email: string
  active: number
}

export interface EventPlatformApiResponse {
  id: number
  name: string
  detail: string | null
  url: string
  email: string
  active: number
  credencial: string | null
}

// Reloj relacionado
export interface EventWatchModel {
  id: number
  code: string
  imei: string
  deviceName: string | null
  platformId: number | null
}

export interface EventWatchApiResponse {
  id: number
  code: string
  imei: string
  device_name: string | null
  platform_id: number | null
}

// Evento principal
export interface EventModel {
  id: number
  title: string
  detail: string
  typeId: number
  carId: number | null
  modemId: number | null
  simId: number | null
  platformId: number | null
  watchId: number | null
  userId: number | null
  createdAt: string
  user: UserModel | null
  car: EventCarModel | null
  modem: EventModemModel | null
  sim: EventSimModel | null
  watch: EventWatchModel | null
  platform: EventPlatformModel | null
  images: ImageModel[]
  comments: CommentModel[]
}

export interface EventApiResponse {
  id: number
  title: string
  detail: string
  type_id: number
  car_id: number | null
  modem_id: number | null
  sim_id: number | null
  platform_id: number | null
  watch_id: number | null
  user_id: number | null
  created_at: string
  updated_at: string
  user: UserModel | null
  car: EventCarApiResponse | null
  modem: EventModemApiResponse | null
  sim: EventSimApiResponse | null
  watch: EventWatchApiResponse | null
  platform: EventPlatformApiResponse | null
  images: ImageApiResponse[]
  comments: CommentApiResponse[]
}

// Paginación
export interface PaginationModel {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  from: number
  to: number
  nextPageUrl: string | null
  prevPageUrl: string | null
}

export interface PaginatedApiResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: { url: string | null; label: string; active: boolean }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

// Estado del Feed
export interface EventFeedState {
  events: EventModel[]
  pagination: PaginationModel
  isLoading: boolean
  isLoadingMore: boolean
  searchTerm: string
  filterDate: string | null
  status: number
  message: string
}

// Payload para crear comentario
export interface CreateCommentPayload {
  event_id: number
  comment: string
  parent_id?: number | null
}
