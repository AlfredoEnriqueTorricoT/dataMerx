import { ApiResponse, SetStateFn } from 'shared/types'
import {
  UserModel,
  PermissionModel,
  CreateUserPayload,
  UpdateUserPayload,
  TogglePermissionPayload,
} from '../models/UserModel'

export interface IUserService {
  getUsers(setLoading?: SetStateFn): Promise<ApiResponse<UserModel[]>>
  createUser(payload: CreateUserPayload, setLoading?: SetStateFn): Promise<ApiResponse<UserModel>>
  updateUser(payload: UpdateUserPayload, setLoading?: SetStateFn): Promise<ApiResponse<UserModel>>
  getUserPermissions(userId: number, setLoading?: SetStateFn): Promise<ApiResponse<PermissionModel[]>>
  togglePermission(payload: TogglePermissionPayload, setLoading?: SetStateFn): Promise<ApiResponse<any>>
}
