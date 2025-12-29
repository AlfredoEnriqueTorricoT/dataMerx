import { ModemBrandApiResponse, ModemBrandModel } from '../models/ModemBrandModel'

export function adaptModemBrandResponseToModel(response: ModemBrandApiResponse): ModemBrandModel {
  return {
    id: response.id,
    name: response.name,
    detail: response.detail,
    createdAt: response.created_at,
    updatedAt: response.updated_at,
  }
}

export function adaptModemBrandListResponseToModel(responses: ModemBrandApiResponse[]): ModemBrandModel[] {
  return responses.map(adaptModemBrandResponseToModel)
}
