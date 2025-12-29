import { WatchLogModel, WatchLogApiResponse } from '../models/WatchLogModel'

/**
 * Formatea fecha a formato simple: DD/MM/YYYY HH:mm
 */
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

/**
 * Adapta la respuesta de la API (snake_case) al modelo UI (camelCase)
 */
export const adaptWatchLogResponseToModel = (apiData: WatchLogApiResponse): WatchLogModel => {
  return {
    id: apiData.id,
    watchCode: apiData.watch_code,
    macAddress: apiData.mac_address,
    createdAt: formatDateTime(apiData.created_at),
  }
}

/**
 * Adapta una lista de respuestas de la API a modelos UI
 */
export const adaptWatchLogListResponseToModel = (apiDataList: WatchLogApiResponse[]): WatchLogModel[] => {
  return apiDataList.map(adaptWatchLogResponseToModel)
}
