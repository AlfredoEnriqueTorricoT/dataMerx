import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlatformCountModel } from '../models/PlatformCountModel'

interface PlatformCountState {
  platformCountList: PlatformCountModel[]
  modemImeiList: string[]
  status: number
  message: string
}

const initialState: PlatformCountState = {
  platformCountList: [],
  modemImeiList: [],
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
    setModemImeiList: (state, action: PayloadAction<string[]>) => {
      state.modemImeiList = action.payload
    },
    clearModemImeiList: (state) => {
      state.modemImeiList = []
    },
  },
})

export const {
  setPlatformCountList,
  addPlatformCount,
  updatePlatformCountInList,
  setStatus,
  resetStatus,
  setModemImeiList,
  clearModemImeiList,
} = platformCountSlice.actions

export default platformCountSlice.reducer
