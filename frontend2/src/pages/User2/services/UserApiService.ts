import { httpRequestWithAuth, transformApiData } from 'shared/utils/httpService'
import { ApiResponse, SetStateFn } from 'shared/types'
import { IUserService } from './IUserService'
import {
  UserModel,
  UserApiResponse,
  PermissionModel,
  PermissionApiResponse,
  CreateUserPayload,
  UpdateUserPayload,
  TogglePermissionPayload,
} from '../models/UserModel'
import {
  adaptUserResponseToModel,
  adaptUserListResponseToModel,
  adaptPermissionListResponseToModel,
} from '../adapters/userAdapter'

export class UserApiService implements IUserService {
  async getUsers(setLoading?: SetStateFn): Promise<ApiResponse<UserModel[]>> {
    const res = await httpRequestWithAuth.get<{ data: UserApiResponse[] }>('user', setLoading)
    return transformApiData(res, (data) => adaptUserListResponseToModel(data.data || []))
  }

  async createUser(
    payload: CreateUserPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<UserModel>> {
    const res = await httpRequestWithAuth.post<{ data: UserApiResponse }>(
      'user',
      payload,
      setLoading
    )
    return transformApiData(res, (data) => adaptUserResponseToModel(data.data))
  }

  async updateUser(
    payload: UpdateUserPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<UserModel>> {
    const res = await httpRequestWithAuth.put<{ data: UserApiResponse }>(
      'user',
      payload,
      setLoading
    )
    return transformApiData(res, (data) => adaptUserResponseToModel(data.data))
  }

  async getUserPermissions(
    userId: number,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<PermissionModel[]>> {
    const res = await httpRequestWithAuth.get<{ data: PermissionApiResponse[] }>(
      `user-permission/${userId}`,
      setLoading
    )
    return transformApiData(res, (data) => adaptPermissionListResponseToModel(data.data || []))
  }

  async togglePermission(
    payload: TogglePermissionPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<any>> {
    const res = await httpRequestWithAuth.post<{ data: any }>(
      'user-permission',
      payload,
      setLoading
    )
    return res
  }
}
