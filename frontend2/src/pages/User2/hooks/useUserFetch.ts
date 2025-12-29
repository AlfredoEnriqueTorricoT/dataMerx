import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserApiService } from '../services/UserApiService'
import {
  setUserList,
  addUser,
  updateUserInList,
  setPermissionsList,
  setIsLoaded,
} from '../slices/userSlice'
import {
  UserModel,
  PermissionModel,
  CreateUserPayload,
  UpdateUserPayload,
  TogglePermissionPayload,
} from '../models/UserModel'

interface RootState {
  User2: {
    userList: UserModel[]
    permissionsList: PermissionModel[]
    isLoaded: boolean
    status: number
    message: string
  }
}

export const useUserFetch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOperating, setIsOperating] = useState(false)
  const dispatch = useDispatch()
  const service = useMemo(() => new UserApiService(), [])

  const { isLoaded } = useSelector((state: RootState) => state.User2)

  // Fetch all users
  const fetchUsers = async () => {
    if (isLoaded) {
      return { success: true, message: 'Data already loaded' }
    }

    const result = await service.getUsers(setIsLoading)
    if (result.data) {
      dispatch(setUserList(result.data))
      dispatch(setIsLoaded(true))
    }
    return { success: result.status === 200, message: result.message }
  }

  // Create user
  const createUser = async (payload: CreateUserPayload) => {
    const result = await service.createUser(payload, setIsOperating)
    if (result.data) {
      dispatch(addUser(result.data))
    }
    return { success: result.status === 200 || result.status === 201, message: result.message }
  }

  // Update user
  const updateUser = async (payload: UpdateUserPayload) => {
    const result = await service.updateUser(payload, setIsOperating)
    if (result.data) {
      dispatch(updateUserInList(result.data))
    }
    return { success: result.status === 200, message: result.message }
  }

  // Fetch user permissions
  const fetchUserPermissions = async (userId: number) => {
    const result = await service.getUserPermissions(userId, setIsOperating)
    if (result.data) {
      dispatch(setPermissionsList(result.data))
    }
    return { success: result.status === 200, message: result.message, data: result.data }
  }

  // Toggle permission
  const togglePermission = async (payload: TogglePermissionPayload) => {
    const result = await service.togglePermission(payload, setIsOperating)
    return { success: result.status === 200, message: result.message }
  }

  return {
    isLoading,
    isOperating,
    fetchUsers,
    createUser,
    updateUser,
    fetchUserPermissions,
    togglePermission,
  }
}
