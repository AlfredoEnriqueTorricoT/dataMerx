import { useSelector } from 'react-redux'
import { UserModel, PermissionModel } from '../models/UserModel'

interface RootState {
  User2: {
    userList: UserModel[]
    permissionsList: PermissionModel[]
    isLoaded: boolean
    status: number
    message: string
  }
}

export const useUser = () => {
  const state = useSelector((state: RootState) => state.User2)

  return {
    userList: state.userList,
    permissionsList: state.permissionsList,
    isLoaded: state.isLoaded,
    status: state.status,
    message: state.message,

    // Helpers
    getTotalUsers: () => state.userList.length,
    getUserById: (id: number) => state.userList.find((user) => user.id === id),
    getActivePermissions: () => state.permissionsList.map((p) => p.name),
  }
}
