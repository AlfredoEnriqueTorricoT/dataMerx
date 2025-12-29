import {
  UserModel,
  UserApiResponse,
  PermissionModel,
  PermissionApiResponse,
} from '../models/UserModel'

export const adaptUserResponseToModel = (data: UserApiResponse): UserModel => ({
  id: data.id,
  name: data.name,
  email: data.email,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
})

export const adaptUserListResponseToModel = (data: UserApiResponse[]): UserModel[] =>
  data.map(adaptUserResponseToModel)

export const adaptPermissionResponseToModel = (data: PermissionApiResponse): PermissionModel => ({
  id: data.id,
  name: data.name,
  guardName: data.guard_name,
})

export const adaptPermissionListResponseToModel = (
  data: PermissionApiResponse[]
): PermissionModel[] => data.map(adaptPermissionResponseToModel)
