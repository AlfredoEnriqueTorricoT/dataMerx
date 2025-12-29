import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserModel, PermissionModel } from '../models/UserModel'

interface UserState {
  userList: UserModel[]
  permissionsList: PermissionModel[]
  isLoaded: boolean
  status: number
  message: string
}

const initialState: UserState = {
  userList: [],
  permissionsList: [],
  isLoaded: false,
  status: 0,
  message: '',
}

const userSlice = createSlice({
  name: 'user2',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<UserModel[]>) => {
      state.userList = action.payload
    },
    addUser: (state, action: PayloadAction<UserModel>) => {
      state.userList.push(action.payload)
    },
    updateUserInList: (state, action: PayloadAction<UserModel>) => {
      const index = state.userList.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state.userList[index] = action.payload
      }
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.userList = state.userList.filter((user) => user.id !== action.payload)
    },
    setPermissionsList: (state, action: PayloadAction<PermissionModel[]>) => {
      state.permissionsList = action.payload
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setStatus: (state, action: PayloadAction<{ status: number; message: string }>) => {
      state.status = action.payload.status
      state.message = action.payload.message
    },
  },
})

export const {
  setUserList,
  addUser,
  updateUserInList,
  removeUser,
  setPermissionsList,
  setIsLoaded,
  setStatus,
} = userSlice.actions

export default userSlice.reducer
