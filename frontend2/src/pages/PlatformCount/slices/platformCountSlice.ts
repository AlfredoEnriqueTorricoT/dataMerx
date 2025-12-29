import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlatformCountModel } from '../models/PlatformCountModel'

interface PlatformCountState {
  platformCountList: PlatformCountModel[]
  status: number
  message: string
}

const initialState: PlatformCountState = {
  platformCountList: [],
  status: 200,
  message: '',
}

interface SetStatusPayload {
  status: number
  message?: string
}

const platformCountSlice = createSlice({
  name: 'platformCount',
  initialState,
  reducers: {
    setPlatformCountList: (state, action: PayloadAction<PlatformCountModel[]>) => {
      state.platformCountList = action.payload
    },
    addPlatformCount: (state, action: PayloadAction<PlatformCountModel>) => {
      state.platformCountList.push(action.payload)
    },
    updatePlatformCountInList: (state, action: PayloadAction<PlatformCountModel>) => {
      const index = state.platformCountList.findIndex((item) => item.name === action.payload.name)
      if (index !== -1) {
        state.platformCountList[index] = action.payload
      }
    },
    setStatus: (state, action: PayloadAction<SetStatusPayload>) => {
      state.status = action.payload.status
      state.message = action.payload.message || ''
    },
    resetStatus: (state) => {
      state.status = 200
      state.message = ''
    },
  },
})

export const {
  setPlatformCountList,
  addPlatformCount,
  updatePlatformCountInList,
  setStatus,
  resetStatus,
} = platformCountSlice.actions

export default platformCountSlice.reducer
