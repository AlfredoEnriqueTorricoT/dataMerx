import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WatchLogModel } from '../models/WatchLogModel'

interface WatchLogState {
  watchLogList: WatchLogModel[]
  status: number
  message: string
}

const initialState: WatchLogState = {
  watchLogList: [],
  status: 200,
  message: '',
}

const watchLogSlice = createSlice({
  name: 'watchLog',
  initialState,
  reducers: {
    setWatchLogList: (state, action: PayloadAction<WatchLogModel[]>) => {
      state.watchLogList = action.payload
    },
    setStatus: (state, action: PayloadAction<{ status: number; message?: string }>) => {
      state.status = action.payload.status
      state.message = action.payload.message || ''
    },
    resetStatus: (state) => {
      state.status = 200
      state.message = ''
    },
  },
})

export const { setWatchLogList, setStatus, resetStatus } = watchLogSlice.actions

export default watchLogSlice.reducer
