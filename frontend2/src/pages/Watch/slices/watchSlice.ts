import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WatchModel } from '../models/WatchModel'

interface WatchState {
  watchList: WatchModel[]
  status: number
  message: string
}

const initialState: WatchState = {
  watchList: [],
  status: 200,
  message: '',
}

interface SetStatusPayload {
  status: number
  message?: string
}

const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
    setWatchList: (state, action: PayloadAction<WatchModel[]>) => {
      state.watchList = action.payload
    },
    addWatch: (state, action: PayloadAction<WatchModel>) => {
      state.watchList.push(action.payload)
    },
    updateWatchInList: (state, action: PayloadAction<WatchModel>) => {
      const index = state.watchList.findIndex((w) => w.id === action.payload.id)
      if (index !== -1) {
        state.watchList[index] = action.payload
      }
    },
    removeWatch: (state, action: PayloadAction<number>) => {
      state.watchList = state.watchList.filter((w) => w.id !== action.payload)
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
  setWatchList,
  addWatch,
  updateWatchInList,
  removeWatch,
  setStatus,
  resetStatus,
} = watchSlice.actions

export default watchSlice.reducer
