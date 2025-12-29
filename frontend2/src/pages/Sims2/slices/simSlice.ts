import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SimModel, SimDetailsModel, SimEventModel } from '../models/SimModel'

interface SimState {
  simList: SimModel[]
  simDetails: SimDetailsModel | null
  eventList: SimEventModel[]
  isLoaded: boolean
  status: number
  message: string
}

const initialState: SimState = {
  simList: [],
  simDetails: null,
  eventList: [],
  isLoaded: false,
  status: 200,
  message: '',
}

interface SetStatusPayload {
  status: number
  message?: string
}

const simSlice = createSlice({
  name: 'sim',
  initialState,
  reducers: {
    // Sims
    setSimList: (state, action: PayloadAction<SimModel[]>) => {
      state.simList = action.payload
    },
    addSim: (state, action: PayloadAction<SimModel>) => {
      state.simList.push(action.payload)
    },
    updateSimInList: (state, action: PayloadAction<SimModel>) => {
      const index = state.simList.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) {
        state.simList[index] = action.payload
      }
    },
    removeSim: (state, action: PayloadAction<number>) => {
      state.simList = state.simList.filter((s) => s.id !== action.payload)
    },

    // Detalles
    setSimDetails: (state, action: PayloadAction<SimDetailsModel | null>) => {
      state.simDetails = action.payload
    },

    // Eventos
    setEventList: (state, action: PayloadAction<SimEventModel[]>) => {
      state.eventList = action.payload
    },
    addEvent: (state, action: PayloadAction<SimEventModel>) => {
      state.eventList.push(action.payload)
    },

    // Status
    setStatus: (state, action: PayloadAction<SetStatusPayload>) => {
      state.status = action.payload.status
      state.message = action.payload.message || ''
    },
    resetStatus: (state) => {
      state.status = 200
      state.message = ''
    },

    // Loaded flag
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
  },
})

export const {
  setSimList,
  addSim,
  updateSimInList,
  removeSim,
  setSimDetails,
  setEventList,
  addEvent,
  setStatus,
  resetStatus,
  setIsLoaded,
} = simSlice.actions

export default simSlice.reducer
