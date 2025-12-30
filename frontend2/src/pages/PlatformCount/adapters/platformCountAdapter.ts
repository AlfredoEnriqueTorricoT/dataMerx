import { PlatformCountApiResponse, PlatformCountModel } from '../models/PlatformCountModel'

export const adaptPlatformCountResponseToModel = (data: PlatformCountApiResponse): PlatformCountModel => ({
  id: data.id,
  name: data.name,
  count: data.count,
})

export const adaptPlatformCountListResponseToModel = (data: PlatformCountApiResponse[]): PlatformCountModel[] =>
  data.map(adaptPlatformCountResponseToModel)
