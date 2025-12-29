import { PlatformCountApiResponse, PlatformCountModel } from '../models/PlatformCountModel'

export const adaptPlatformCountResponseToModel = (data: PlatformCountApiResponse): PlatformCountModel => ({
  name: data.name,
  count: data.count,
})

export const adaptPlatformCountListResponseToModel = (data: PlatformCountApiResponse[]): PlatformCountModel[] =>
  data.map(adaptPlatformCountResponseToModel)
