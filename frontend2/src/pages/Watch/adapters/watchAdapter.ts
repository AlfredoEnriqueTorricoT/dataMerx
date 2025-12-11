import {
  WatchModel,
  WatchApiResponse,
  CreateWatchDto,
  UpdateWatchDto,
  ConfigureWatchDto,
  CreateWatchPayload,
  UpdateWatchPayload,
  ConfigureWatchPayload,
} from '../models/WatchModel'

/**
 * Adapta la respuesta de la API (snake_case) al modelo UI (camelCase)
 */
export const adaptWatchResponseToModel = (apiData: WatchApiResponse): WatchModel => {
  return {
    id: apiData.id,
    code: apiData.code,
    imei: apiData.imei,
    deviceName: apiData.device_name,
    sigueloDeviceId: apiData.siguelo_device_id,
    platformId: apiData.platform_id,
    platformName: apiData.platform_name || null,
    isPending: Boolean(apiData.is_pending),
    responsabilityId: apiData.responsability_id,
    userResponsabilityId: apiData.user_responsability_id,
    userSuccessorId: apiData.user_successor_id,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
  }
}

/**
 * Adapta una lista de respuestas de la API a modelos UI
 */
export const adaptWatchListResponseToModel = (apiDataList: WatchApiResponse[]): WatchModel[] => {
  return apiDataList.map(adaptWatchResponseToModel)
}

/**
 * Adapta el DTO de crear al payload de la API (snake_case)
 */
export const adaptCreateWatchDtoToPayload = (dto: CreateWatchDto): CreateWatchPayload => {
  return {
    imei: dto.imei,
    code: dto.code,
    platform_id: dto.platformId,
    device_name: dto.deviceName,
  }
}

/**
 * Adapta el DTO de actualizar al payload de la API (snake_case)
 */
export const adaptUpdateWatchDtoToPayload = (dto: UpdateWatchDto): UpdateWatchPayload => {
  const payload: UpdateWatchPayload = {
    id: dto.id,
  }

  if (dto.imei !== undefined) payload.imei = dto.imei
  if (dto.code !== undefined) payload.code = dto.code
  if (dto.platformId !== undefined) payload.platform_id = dto.platformId
  if (dto.deviceName !== undefined) payload.device_name = dto.deviceName
  if (dto.sigueloDeviceId !== undefined) payload.siguelo_device_id = dto.sigueloDeviceId
  if (dto.isPending !== undefined) payload.is_pending = dto.isPending
  if (dto.responsabilityId !== undefined) payload.responsability_id = dto.responsabilityId
  if (dto.userResponsabilityId !== undefined) payload.user_responsability_id = dto.userResponsabilityId
  if (dto.userSuccessorId !== undefined) payload.user_successor_id = dto.userSuccessorId

  return payload
}

/**
 * Adapta el DTO de configurar al payload de la API
 */
export const adaptConfigureWatchDtoToPayload = (dto: ConfigureWatchDto): ConfigureWatchPayload => {
  return {
    id: dto.id,
    platform_id: dto.platformId,
    device_imei: dto.deviceImei,
  }
}
